import { registerDecorator, ValidationOptions } from 'class-validator';
import { containsBlacklistWord } from '../utils/containsBlacklistWord';

export function isCleanSlug(validationOptions?: ValidationOptions) {
    return (obj: Object, propertyName: string) => {
        registerDecorator({
            name: 'isCleanSlug',
            target: obj.constructor,
            options: validationOptions,
            propertyName,
            validator: {
                validate(value: string, _args) {
                    return typeof containsBlacklistWord(value) === 'string' ? false : true;
                },
                defaultMessage(_args) {
                    return `The value ${_args?.value} contains restricted term: ${containsBlacklistWord(_args?.value)}.`;
                },
            },
        });
    };
}
