/**
 * ! Patrón Prototype:

 * Es un patrón de diseño creacional que nos permite copiar objetos existentes sin hacer
 * que el código dependa de sus clases.
 * 
 * * Es útil cuando queremos duplicar el contenido, 
 * * el título y el autor de un documento, por ejemplo o cualquier objeto complejo.
 * 
 * https://refactoring.guru/es/design-patterns/prototype
 */

class Document {
    public title: string;
    private content: string;
    public author: string;

    constructor(title: string, content: string, author: string) {
        this.title = title;
        this.content = content;
        this.author = author;
    }

    displayInfo(): void {
        console.log(`Title: ${this.title}`);
        console.log(`Content: ${this.content}`);
        console.log(`Author: ${this.author}`);
    }

    clone(): Document {
        return new Document(this.title, this.content, this.author);
    }
}

function main() {
    const document1 = new Document('Corización', '500 dólares', 'Erick');
    console.log({ document: document1 });
    document1.displayInfo();
    
    // const document2 = { ...document1 };
    // const document2 = structuredClone(document1);
    // document2.title = 'Nueva cotización';
    // console.log({ document2: document2 })

    const document2 = document1.clone();
    document2.title = 'Nueva cotización';

    console.log({ document: document1 });
    document1.displayInfo();
    
    console.log({ document: document2 });
    document2.displayInfo();
}

main()

