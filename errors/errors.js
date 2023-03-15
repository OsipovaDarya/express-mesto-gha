/* eslint-disable max-classes-per-file */
class AplicationError extends Error {
  constructor(status = 500, message = 'Внутрення ошибка') {
    super();
    this.status = status;
    this.message = message;
    this.name = this.constructor.name;

    Error.captureStackTrace(this, this.constructor);
  }
}

class UserNotFound extends AplicationError {
  constructor() {
    super(404, 'Пользователь не найден');
  }
}

module.export = UserNotFound;
