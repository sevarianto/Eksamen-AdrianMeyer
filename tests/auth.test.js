// auth.test.js - tester at kun gyldige brukere kan registreres og logge inn

describe('Autentisering', () => {
  it('skal ikke tillate registrering med duplikat brukernavn', async () => {
    const første = await registerUser({ username: 'unik', password: 'abc' });
    const andre = await registerUser({ username: 'unik', password: 'def' });
    expect(andre).toBe(false); 
  });
});