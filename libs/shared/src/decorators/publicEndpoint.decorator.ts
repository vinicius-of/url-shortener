import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_ASSIGNED = 'IS_PUBLIC_ASSIGNED';
export const Public = () => SetMetadata(IS_PUBLIC_ASSIGNED, true);
