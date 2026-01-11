/**
 * ! Inmutabilidad con copia
 * Aunque la inmutabilidad es una buena práctica, no siempre es posible.
 * En estos casos, se puede hacer una copia del objeto y modificar la copia.
 *
 *  * Es útil para mantener un historial de estados en aplicaciones interactivas.
 *
 */

import { COLORS } from "../helpers/colors.ts";

class CodeEditorState {

    readonly content: string;
    readonly cursorLine: number;
    readonly unsavedChanges: boolean;

    constructor(
        content: string,
        cursorLine: number,
        unsavedChanges: boolean
    ) {
        this.content = content;
        this.cursorLine = cursorLine;
        this.unsavedChanges = unsavedChanges;
    }

    displayState(): void {
        console.log('\n%cEstado del editor:', COLORS.green);
        console.log(`
Content: ${this.content}    
Cursor Line: ${this.cursorLine}    
Unsaved changes: ${this.unsavedChanges}    
        `);
    }

    copyWith({
        content, cursorLine, unsavedChanges
    }: Partial<CodeEditorState>): CodeEditorState {
        return new CodeEditorState(
            content ?? this.content,
            cursorLine ?? this.cursorLine,
            unsavedChanges ?? this.unsavedChanges
        );
    }

}

class CodeEditorHistory {
    private history: CodeEditorState[] = [];
    private currentIndex: number = -1;
    
    save(state: CodeEditorState): void {
        if (this.currentIndex < this.history.length - 1) {
            this.history = this.history.slice(0, this.currentIndex + 1);
        }
        this.history.push(state);
        this.currentIndex++;
    }

    redo(): CodeEditorState | null {
        if (this.currentIndex < this.history.length - 1) {
            this.currentIndex++;
            return this.history[this.currentIndex];
        }
        return null;
    }

    undo(): CodeEditorState | null {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            return this.history[this.currentIndex];
        }
        return null;
    }
}

function main() {
    const history = new CodeEditorHistory();
    let editorState = new CodeEditorState("console.log('Hola Mundo');", 1, false);

    console.log('%cEstado inicial:', COLORS.blue);
    history.save(editorState);
    editorState.displayState();
    
    console.log('%cDespués del primer cambio:', COLORS.blue);
    editorState = editorState.copyWith({
        content: "console.log('Hola Mundo');\nconsole.log('Nueva línea');\n",
        cursorLine: 3,
        unsavedChanges: true
    });
    history.save(editorState);
    editorState.displayState();
    
    console.log('%cDespués de mover el cursor:', COLORS.blue);
    editorState = editorState.copyWith({ cursorLine: 2 });
    history.save(editorState);    
    editorState.displayState();

    console.log({ history });
    
    console.log('%cDespués del Undo:', COLORS.blue);
    editorState = history.undo()!;    
    editorState.displayState();

    console.log({ history });
    editorState = editorState.copyWith({
        content: "console.log('Hola Mundo');\nconsole.log('Nueva línea');\nconsole.log('Tercer línea');\n",
        cursorLine: 3,
        unsavedChanges: true
    });
    history.save(editorState);
    console.log({ history });
    
    // console.log('%cDespués del Redo:', COLORS.blue);
    // editorState = history.redo()!;    
    // editorState.displayState();
}

main();