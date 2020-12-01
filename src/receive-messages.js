const AWS = require('aws-sdk')
AWS.config.update({
    region: 'us-east-1'
})
const sqs = new AWS.SQS();
const QUEUE_URL = 'https://sqs.us-east-1.amazonaws.com/364350264218/alura-test';

(async () => {
    const messages = await sqs.receiveMessage({
        QueueUrl: QUEUE_URL,
        MaxNumberOfMessages: 10,
        WaitTimeSeconds: 20
    }).promise();

    if (messages.Messages) {
        messages.Messages.forEach(async message => {
            try {
                const body = JSON.parse(message.Body);
                console.log('processando mensagem...');
                console.log(`realizando transferência da conta ${body.conta_origem.numero_conta} para a conta ${body.conta_destino.numero_conta}`);
                console.log(`transferência no valor de ${body.valor} ${body.moeda} efetivada!`);
                await sqs.deleteMessage({
                    QueueUrl: QUEUE_URL,
                    ReceiptHandle: message.ReceiptHandle
                }).promise();
                console.log('mensagem processada (e excluída) com sucesso!');
            } catch (e) {
                throw new Error('Mensagem não está no formato JSON');
            }
        })
    }
})();