import type {TTab} from "./types";

export const TYPE_INGREDIENTS:{[name:string]: TTab} = {
  BUN: 'bun',
  SAUCE: 'sauce',
  MAIN: 'main',
}

export const NAME_INGREDIENTS = {
  BUN: 'Булки',
  SAUCE: 'Соусы',
  MAIN: 'Начинки',
}

export const TEXT_ERROR_REQUEST = 'Что то пошло не так. подождите или перезагрузите страницу';
export const TEXT_ERROR_NO_BUN = 'Булка не добавлена!';
export const TEXT_ERROR_NOT_FILLED_FIELDS = 'Не заполнены корректно все поля!';
