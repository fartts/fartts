import Root from './root';
import Branch from './branch';

export default interface Tree {
  root: Root;
  branches: IterableIterator<Branch>;
  life: number;
}
