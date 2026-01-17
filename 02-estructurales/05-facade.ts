/**
 * ! Patrón Facade
 * Este patrón proporciona una interfaz unificada para un conjunto de interfaces
 * en un subsistema.
 *
 * Facade define una interfaz de nivel más alto que hace que el subsistema
 * sea más fácil de usar.
 *
 * * Es útil cuando un subsistema es complejo o difícil de entender para
 * * proporcionar una interfaz simplificada para el cliente.
 *
 * https://refactoring.guru/es/design-patterns/facade
 */

import { COLORS } from "../helpers/colors.ts";

class Projector {
    turnOn() {
        console.log('Proyector encendido');
    }

    turnOff() {
        console.log('Proyector apagándose');
    }
}

class SoundSystem {
    on() {
        console.log('Sistema de sonido encendido');
    }

    off() {
        console.log('Sistema de sonido apagado');
    }
}

class VideoPlayer {
    on() {
        console.log('Reproductor de video encendido');
    }
    
    off() {
        console.log('Reproductor de video apagado');
    }

    play(movie: string) {
        console.log(`Reproduciendo %c${movie}`, COLORS.blue);
    }

    stop() {
        console.log('Película detenida');
    }
}

class PopcornMaker {
    poppingPopcorn() {
        console.log('Preparando palomitas');
    }

    turnOffpoppingPopcorn() {
        console.log('Apagando palomera');
    }
}

interface HomeTheaterFacadeProps {
    projector: Projector;
    soundSystem: SoundSystem;
    videoPlayer: VideoPlayer;
    popcornMaker: PopcornMaker;
}

class HomeTheaterFacade {
    private projector: Projector;
    private soundSystem: SoundSystem;
    private videoPlayer: VideoPlayer;
    private popcornMaker: PopcornMaker;

    constructor({
        projector,
        soundSystem,
        videoPlayer,
        popcornMaker
    }: HomeTheaterFacadeProps) {
        this.projector = projector;
        this.soundSystem = soundSystem;
        this.videoPlayer = videoPlayer;
        this.popcornMaker = popcornMaker;
    }

    watchMovie(movie: string): void {
        console.log('%cPreparando para ver película', COLORS.blue);
        this.popcornMaker.poppingPopcorn();
        this.projector.turnOn();
        this.soundSystem.on();
        this.videoPlayer.on();
        this.videoPlayer.play(movie);
        console.log('%cDisfrute la película', COLORS.green);
    }
    
    endWatchingMovie(): void {

        this.popcornMaker.turnOffpoppingPopcorn();
        this.projector.turnOff();
        this.soundSystem.off();
        this.videoPlayer.stop();
        this.videoPlayer.off();
        
    }
}

function main() {
    const movie = '50 First Dates';
    const projector = new Projector();
    const soundSystem = new SoundSystem();
    const videoPlayer = new VideoPlayer();
    const popcornMaker = new PopcornMaker();

    const homeTheaterFacade = new HomeTheaterFacade({ projector, soundSystem, videoPlayer, popcornMaker });

    homeTheaterFacade.watchMovie(movie);
    homeTheaterFacade.endWatchingMovie();
}

main();