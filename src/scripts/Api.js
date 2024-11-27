export class Api {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers || {
            'Authorization': '24d8aa49-6bef-4a1c-8834-8b629389c058', // Token de autenticação
            'Content-Type': 'application/json',
        };
    }

    // Método genérico para requisições
    async _fetch(url, options = {}) {
        try {
            const response = await fetch(url, {
                headers: this._headers,
                ...options,
            });

            if (!response.ok) {
                throw new Error(`Erro: ${response.status} (${response.statusText})`);
            }

            return await response.json();
        } catch (error) {
            console.error(`Erro na requisição para ${url}:`, error.message || error);
            throw error;
        }
    }

    // Método para buscar informações do usuário
    async getUserInfo() {
        return this._fetch(`${this._baseUrl}/users/me`, { method: 'GET' });
    }

    // Método para atualizar o perfil
    async updateProfile(name, about) {
        const res = await fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                about: about
            })
        });
        if (!res.ok) {
            throw new Error(`Erro: ${res.status}`);
        }
        return await res.json();
    }
    
    // Método para buscar os cartões iniciais
    async getInitialCards() {
        return this._fetch(`${this._baseUrl}/cards`, { method: 'GET' });
    }

    // Método para adicionar um novo cartão
    async addCard({ name, link }) {
        return this._fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            body: JSON.stringify({ name, link }),
        });
    }

    // Método para deletar um cartão
    async deleteCard(cardId) {
        return this._fetch(`${this._baseUrl}/cards/${cardId}`, { method: 'DELETE' });
    }

    // Método para alternar likes (adicionar/remover)
    async toggleLike(cardId, method) {
        return this._fetch(`${this._baseUrl}/cards/${cardId}/likes`, { method });
    }

    // Método para atualizar a foto do perfil
    async updateProfileAvatar(newAvatarUrl) {
        return this._fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            body: JSON.stringify({ avatar: newAvatarUrl }), // Envia o link da nova foto de perfil
        });
    }
}
