const AWS = require('aws-sdk')
AWS.config.update({
    region: 'us-east-1'
})
const sqs = new AWS.SQS();
(async () => {
    await sqs.sendMessage({
        MessageBody: `<?xml version="1.0" encoding="UTF-8" ?>
        <root>
          <conta_origem>
            <agencia>1</agencia>
            <numero_conta>123456-7</numero_conta>
          </conta_origem>
          <conta_destino>
            <agencia>1</agencia>
            <numero_conta>765432-1</numero_conta>
          </conta_destino>
          <valor>1000</valor>
          <moeda>BRL</moeda>
        </root>`,
        QueueUrl: 'https://sqs.us-east-1.amazonaws.com/364350264218/alura-test'
    }).promise();
    console.log('mensagem envenenada enviada com sucesso!')
})();