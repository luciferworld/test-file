const { Function: Func, NeoxrApi } = new(require('@neoxr/wb'))
global.Api = new NeoxrApi(process.env.API_ENDPOINT, process.env.API_KEY)
global.header = `© Lucifer-md v${require('package.json').version} (Beta)`
global.footer = `Bot made by ibrahim ッ`
   global.status = Object.freeze({
   invalid: Func.Styles('Invalid url'),
   verified: Func.Styles('To use bot you need to verify your account, to verify use /regsiter'),
   wrong: Func.Styles('Wrong format.'),
   fail: Func.Styles('Can\'t get metadata'),
   error: Func.Styles('Error occurred'),
   errorF: Func.Styles('Sorry this feature is in error.'),
   premium: Func.Styles('This feature only for premium user.'),
   auth: Func.Styles('You do not have permission to use this feature, ask the owner first.'),
   owner: Func.Styles('This command only for owner.'),
   group: Func.Styles('This command will only work in groups.'),
   botAdmin: Func.Styles('This command will work when I become an admin.'),
   admin: Func.Styles('This command only for group admin.'),
   private: Func.Styles('Use this command in private chat.'),
   gameSystem: Func.Styles('Game features have been disabled.'),
   gameInGroup: Func.Styles('Game features have not been activated for this group.'),
   gameLevel: Func.Styles('You cannot play the game because your level has reached the maximum limit.')
})
global.keyxxx = [
   'VhfD2JmZ2jSZMUGJI_TPosUlLYIdZV2q18xbZHpj3DjPcxATB4jlHlVbqcGCsp64UpVSvpmX3GHKPUvwAqDffqYPK_mVd3tjPKcVMnmTAnknEB2Qh30EUl0PI59Yy92sx6r9FDDOYC3cq7N1m6kAeM0vCTs1r4pwL1V1ZRr8_bQWraGBZExYvkqkhYOv3EjlHBk3qFHPCBIGJRhKyE0Flay0__JJ2GJrIrfyjylJe-Q'
];

global.bing = global.keyxxx[Math.floor(Math.random() * global.keyxxx.length)];
