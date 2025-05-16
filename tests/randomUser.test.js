// randomUser.test.js - tester at randomuser byttes ved endring av filter eller swipe, men ikke refresh

describe('Caching av random user', () => {
  it('skal gjenbruke cachet random user ved refresh', async () => {
    const bruker = { name: { first: 'Lars', last: 'Test', title: 'Mr' }, dob: { age: 30 }, location: { city: 'Bergen', country: 'Norge' }, picture: { large: 'test.jpg' } };
    localStorage.setItem('currentRandomUser', JSON.stringify(bruker));
    await loadOrReuseUser();
    expect(window.UserCard.showUser).toHaveBeenCalledWith(bruker);
  });
});