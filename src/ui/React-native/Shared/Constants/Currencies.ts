import ICurrencyFormat from "../../../../Domain/Shared/CurrencyFormat";

const CurrenciesFormat: ICurrencyFormat[] = [
    {
        currency: 'USD',
        example: '$10,000.00',
        formatFunc: 'function (amount) { return `$${amount.toFixed(2).replace(/\\B(?=(\\d{3})+(?!\\d))/g, ",")}`; }'
      },
      {
        currency: 'EUR',
        example: '10.000,00 €',
        formatFunc: 'function (amount) { return `${amount.toFixed(2).replace(/\\B(?=(\\d{3})+(?!\\d))/g, ".").replace(".", ",")} €`; }'
      },
      {
        currency: 'JPY',
        example: '¥10,000',
        formatFunc: 'function (amount) { return `¥${amount.toString().replace(/\\B(?=(\\d{3})+(?!\\d))/g, ",")}`; }'
      },
      {
        currency: 'GBP',
        example: '£10,000.00',
        formatFunc: 'function (amount) { return `£${amount.toFixed(2).replace(/\\B(?=(\\d{3})+(?!\\d))/g, ",")}`; }'
      },
      {
        currency: 'AUD',
        example: 'A$10,000.00',
        formatFunc: 'function (amount) { return `A$${amount.toFixed(2).replace(/\\B(?=(\\d{3})+(?!\\d))/g, ",")}`; }'
      },
      {
        currency: 'CAD',
        example: 'C$10,000.00',
        formatFunc: 'function (amount) { return `C$${amount.toFixed(2).replace(/\\B(?=(\\d{3})+(?!\\d))/g, ",")}`; }'
      },
      {
        currency: 'CHF',
        example: 'CHF 10’000.00',
        formatFunc: 'function (amount) { return `CHF ${amount.toFixed(2).replace(/\\B(?=(\\d{3})+(?!\\d))/g, "\'")}`; }'
      },
      {
        currency: 'CNY',
        example: '¥10,000.00',
        formatFunc: 'function (amount) { return `¥${amount.toFixed(2).replace(/\\B(?=(\\d{3})+(?!\\d))/g, ",")}`; }'
      },
      {
        currency: 'INR',
        example: '₹10,000.00',
        formatFunc: 'function (amount) { return `₹${amount.toFixed(2).replace(/\\B(?=(\\d{2})+(?=\\d{3})+(?!\\d))/g, ",")}`; }'
      },
      {
        currency: 'XAF',
        example: '10 000 XAF',
        formatFunc: 'function (amount) { return `${amount.toString().replace(/\\B(?=(\\d{3})+(?!\\d))/g, " ")} XAF`; }'
      }
];
export default CurrenciesFormat;