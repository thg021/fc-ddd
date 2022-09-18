import { Customer } from './../entity/customer';
import { RepositoryInterface } from './repository-interface';

export interface ProductRepositoryInterface extends RepositoryInterface<Customer>{}