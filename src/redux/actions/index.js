export const saveEmailLogin = 'SAVE_EMAIL_lOGIN';

export function addPersonalLogin(payload) {
  return {
    type: saveEmailLogin,
    payload,
  };
}
