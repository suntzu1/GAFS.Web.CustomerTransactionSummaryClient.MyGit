import { CommonfunctionsModule } from './commonfunctions.module';

describe('CommonfunctionsModule', () => {
  let commonfunctionsModule: CommonfunctionsModule;

  beforeEach(() => {
    commonfunctionsModule = new CommonfunctionsModule();
  });

  it('should create an instance', () => {
    expect(commonfunctionsModule).toBeTruthy();
  });
});
