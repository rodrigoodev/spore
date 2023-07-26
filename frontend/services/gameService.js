import JogoMatematica from '@/components/games/jogo-matematica/JogoMatematica.vue';
import JogoImagem from '@/components/games/jogo-imagem/JogoImagem.vue';

class GameService {
  constructor() {
    this.games = {};
  }

  registerGame(name, component) {
    this.games[name] = component;
  }

  getGame(name) {
    return this.games[name];
  }
}

const gameService = new GameService();
gameService.registerGame('jogo-matematica', JogoMatematica);
gameService.registerGame('jogo-imagem', JogoImagem);

export default gameService;