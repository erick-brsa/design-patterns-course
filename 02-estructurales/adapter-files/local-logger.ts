import { COLORS } from '../../helpers/colors.ts';

export class LocalLogger {
    constructor(
        private file: string
    ) {
    }

    writeLog(message: string): void {
        console.log(`[${this.file} log] ${message}`)
    }
    
    writeWarning(message: string): void {
        console.log(`%c[${this.file} warning] ${message}`, COLORS.yellow)
    }

    writeError(message: string): void {
        console.log(`%c[${this.file} error] ${message}`, COLORS.red)
    }
}
