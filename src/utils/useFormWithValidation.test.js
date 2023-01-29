import { RegexEmail } from './constants.js';
import { useFormWithValidation } from './useFormWithValidation';

const { isValidPassword, validateUserInput } = require('../index.js');
// Эти данные должны проходить проверку
const dataValid = { email: 'bob@gmail.ru', password: '1amAp0k3m0n%' };

// Эти данные не должны проходить проверку
const dataInvalidEmail = { email: 'bob', password: '1amAp0k3m0n%' };
const dataInvalidPassword = { email: 'bob@yandex.ru', password: '123456' };
const dataInvalidCredentials = { email: 'bob', password: '12345' };


