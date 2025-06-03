class UserNotFoundException extends Error {
    constructor(message: string) {
        super(message);
        this.name = "UserNotFoundException";
    }
}

class Logger {
    log(message: string): void {
        console.log(`[LOG] ${message}`);
    }
}

const USERS: Record<string, string> = {
    "1": "Julien",
    "2": "Rajerison",
    "3": "Jul"
};

class UserRepository {
    findUser(id: string): string | null {
        return USERS[id] ?? null;
    }

    getUserById(id: string): string {
        const user = this.findUser(id);
        if (!user) {
            throw new UserNotFoundException(`User with ${id} not found !`);
        }
        return user;
    }
}

class Controller {
    getCurrentUser(id: string): string {
        const logger = new Logger();
        try {
            const repository = new UserRepository();
            return repository.getUserById(id);
        } catch (error) {
            if (error instanceof UserNotFoundException) {
                const message = error.message;
                logger.log(message);
                return message;
            } else {
                throw error;
            }
        }
    }
}

const main = new Controller();
console.log(main.getCurrentUser("2"));
