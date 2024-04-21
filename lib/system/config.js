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
    '1LzFVXziZDqg4-9tN3GFR3HSny2O_goiWubhYH3rhrcmx2weTaqPmTSSCf2csToVE2wgUgGMSgyJcV3ZYV42CnmXcHORIrME6Sd7G6rHlhF2guecQsXzMTxlhM8X_Iy9QrpjPaZKeBHKZ_nGugUJu3Re4G0oS1YDi3RZfsgdnD6nWcsivy5-nTFFiS0mRc8QK1Ff8upKRS0yzuyXQfgkYmQ',
    '1IwiDnRraD1X108sZswcHdbGx9XQn4_Cb_8h6HTeYNvpeXXyHuTE_kbG78slGp9kLU37YFgX_2Es-uxJ1DOI9492LvK8UNT-t3G46nXZH7MM38kB9yGN8gdCALvNgx-KXOqCaHo_qFQ76ydCr5qsFliVcUzKLeIdBH9I9k6t4WPvo7qZSCTzV1qaaFYrW0haEEsEMFJr-Df7fUuBu68Wi-ldCUEZy1B2vj6ZeiZERF5c',
    '1LEzlkXKh5nHWf6H0lfM4ooJtAb_lQwpCn0su9B_v6dWoL5-qshq5LVzZ1ebyM2UINthZ7CBLsBY6p6rqdCtkXPhHG6h65h7KkJ1Ckak7vPN5zRMLy6FLYBziw1N753TPdwW7WZtOz3Pvca4tUU1fxQ_ZRnt-fhG3p8Dnp9MbkLlI3gQ_FJmpYnm7fwn10a-5iZpM8Ozacibh5F41oXIfDA',
    '1YR00qDoGFenP0FR3zRCNUDTm-bSr-pCgFGcUkCcxpvcdtHP_4UlM4bOmi5h8F3pBxie0-YMTXy4bHntUxcBUjhME-6DHt0idItRXQq6cJg2PTL6NBlletWYTlFPff4uQBvD84qb9vuYdfSS11eQCBQ64WybBO57Mnb7PNEZieWMm1ArxIt-RHErznU9fTRuGHiLam4iA3dd_UskE0i4lA5Np7Vy68EPaaHhyzjdawco'
];

global.bing = '1xP1qOakP4Z3p48DtmyFhULCqzvUJwYzEd3UuVk0vtqxVhS4vJCgrlI4j3qlnd0pNRK3CC2jPfl0SFBaXnV-bsrotw_2SXTNU0YJUpO6bw0OxOHGBfc902O-O1_8ve3zemJxtmnrqiJMQMI3hARlBGcpXMioAGCc_Aklf69STKmkAgPbN5X6c9IxR2BgdJzjrev04abbxtLbCftogZ4pcN-YOyRYWRwRCHKTgkTkv8Qo'
