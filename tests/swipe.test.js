// swipe.test.js - tester at bruker kan "like" og at ved "like"-swipe lagres den likte brukeren

describe('Swipe', () => {
  it('skal legge til likt bruker i likt bruker listen', async () => {
    const bruker = { name: { first: 'Anna', last: 'Test', title: 'Ms' }, dob: { age: 25 }, location: { city: 'Oslo', country: 'Norge' }, picture: { large: 'test.jpg' } };
    await addLikedUser(bruker);
    const likteBrukere = await getLikedUsers();
    expect(likteBrukere.some(u => u.name.first === 'Anna')).toBe(true);
  });
});