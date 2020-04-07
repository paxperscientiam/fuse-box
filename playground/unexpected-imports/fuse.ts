import { fusebox } from '../../src/core/fusebox';

fusebox({
  target: 'web-worker',
  entry: 'src/index.ts',
  webIndex: false,
  devServer: false,
}).runProd()
