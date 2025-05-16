// filterStorage.test.js - tester at valgte filter bevares ved refresh

describe('Filterlagring', () => {
  it('skal lagre og hente filterverdier', () => {
    window.FilterStorage.save({ gender: 'female', minAge: 22, maxAge: 30 });
    const verdier = window.FilterStorage.getValues();
    expect(verdier.gender).toBe('female');
    expect(verdier.minAge).toBe(22);
    expect(verdier.maxAge).toBe(30);
  });
});