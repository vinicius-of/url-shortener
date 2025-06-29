import { registerDecorator, ValidationOptions } from 'class-validator';
import { containsBlacklistWord } from '../utils/containsBlacklistWord';

export function isCleanSlug(validationOptions?: ValidationOptions) {
    return (obj: object, propertyName: string) => {
        registerDecorator({
            name: 'isCleanSlug',
            target: obj.constructor,
            options: validationOptions,
            propertyName,
            validator: {
                validate(value: string) {
                    return typeof containsBlacklistWord(value) === 'string' ? false : true;
                },
                defaultMessage(_args) {
                    return `The value ${_args?.value} contains restricted term: ${containsBlacklistWord(_args?.value)}.`;
                },
            },
        });
    };
}
