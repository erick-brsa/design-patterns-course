/**
 * ! Patrón Flyweight
 * Es un patrón de diseño estructural que nos permite usar objetos compartidos
 * para soportar eficientemente grandes cantidades de objetos.
 *
 * * Es útil cuando necesitamos una gran cantidad de objetos y queremos reducir
 * * la cantidad de memoria que utilizan.
 *
 * https://refactoring.guru/es/design-patterns/flyweight
 */

import { COLORS } from "../helpers/colors.ts";


interface Coords {
    x: number;
    y: number;
}

interface Location {
    display(coordinates: Coords): void;
}

// Flyweight
class LocationIcon implements Location {

    private type: string; // hospital, escuela, parque
    private iconImage: string; // imagen del marcador

    constructor(type: string, iconImage: string) {
        this.type = type;
        this.iconImage = iconImage;
    }

    display({ x, y }: Coords): void {
        console.log(`Coords: ${this.type} en ${x}, ${y} con icono %c[${this.iconImage}]`, COLORS.blue);
    }

}

// Fábrica de Flyweights
class LocationFactory {
    
    private icons: Record<string, LocationIcon> = {};

    getLocationIcon( type: string ): LocationIcon {
        if (!this.icons[type]) {
            console.log(`%cCreando una instancia del icono de ${type}`, COLORS.red);
            const iconImage = `imagen_de_${type.toLocaleLowerCase()}.png`;
            this.icons[type] = new LocationIcon(type, iconImage);    
        }
        return this.icons[type];
    }

}

class MapLocation {
    private coordinates: Coords;
    private icon: LocationIcon;

    constructor(coordinates: Coords, icon: LocationIcon) {
        this.coordinates = coordinates;
        this.icon = icon;
    }

    display() {
        this.icon.display(this.coordinates);
    }
}

function main() {
    const factory = new LocationFactory();
    const locations = [
        new MapLocation({ x: 10, y: 20 }, factory.getLocationIcon('hospital')),
        new MapLocation({ x: 20, y: 40 }, factory.getLocationIcon('hospital')),
        new MapLocation({ x: 30, y: 50 }, factory.getLocationIcon('hospital')),
        new MapLocation({ x: 40, y: 80 }, factory.getLocationIcon('parque')),
        new MapLocation({ x: 40, y: 80 }, factory.getLocationIcon('parque')),
        new MapLocation({ x: 40, y: 80 }, factory.getLocationIcon('parque')),
        new MapLocation({ x: 40, y: 80 }, factory.getLocationIcon('hospital')),
        new MapLocation({ x: 40, y: 80 }, factory.getLocationIcon('escuela')),
        new MapLocation({ x: 40, y: 80 }, factory.getLocationIcon('escuela')),
    ];

    locations.forEach(location => location.display());
}

main();