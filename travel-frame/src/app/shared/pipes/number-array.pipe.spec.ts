import { NumberArrayPipe } from './number-array.pipe';

describe('NumberArrayPipe', () => {
  it('create an instance', () => {
    const pipe = new NumberArrayPipe();
    expect(pipe).toBeTruthy();
  });
});
