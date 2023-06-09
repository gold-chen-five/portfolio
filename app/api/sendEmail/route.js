import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer'

async function nodemailMyself(name, email, text){
    return new Promise((resolve,reject) => {
        //宣告發信物件
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'rachel7465022@gmail.com',
                pass: process.env.EMAILTOKEN
            }
        });

        const options = {
            //寄件者
            from: 'rachel7465022@gmail.com',
            //收件者
            to: 'rachel7465022@gmail.com', 
            //主旨
            subject: '履歷網站', // Subject line
            //純文字
            text: `name:${name}, email:${email}, talk:${text}`, 
        };

        //發送信件方法
        transporter.sendMail(options, function(error, info){
            if(error){
                console.log(error);
                reject('fail')
            }else{
                console.log('訊息發送: ' + info.response);
                resolve('ok')
            }
        });
    })
}

async function nodemailToClient(name, clientEmail, text){
    return new Promise((resolve,reject) => {
        //宣告發信物件
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'rachel7465022@gmail.com',
                pass: process.env.EMAILTOKEN
            }
        });

        const options = {
            //寄件者
            from: 'rachel7465022@gmail.com',
            //收件者
            to: `${clientEmail}`, 
            //主旨
            subject: '潘宗諭履歷網站', // Subject line
            //純文字
            //text: `name:${name}, email:${email}, talk:${text}`, 
            //html
            html: `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>潘宗諭</title>
                    <style>
                        body{
                            height: 100vh;
                            width: 100%;
                            padding: 0;
                            margin: 0;
                            display: flex;
                            flex-direction: column;
                            justify-content: center;
                            align-items: center;
                            gap: 0.1rem;
                        }
                        
                    </style>
                </head>
                <body>
                    <h1>你好, ${name}。我是潘宗諭, 是一名軟體開發人員</h1>
                    <h1>感謝你瀏覽我的網站!</h1>
                    <p>如有興趣與我合作可連繫我的Email</p>
                    <p>rachel7465022@gmail.com</p>
                </body>
                </html>
            `
        };

        //發送信件方法
        transporter.sendMail(options, function(error, info){
            if(error){
                console.log(error);
                reject('fail')
            }else{
                console.log('訊息發送: ' + info.response);
                resolve('ok')
            }
        });
    })
}

export async function POST(request) {
    const res = await request.json()

    try{
        const { name, email, text } = res
        const ok = await nodemailToClient(name, email, text)
        const ok2 = await nodemailMyself(name, email, text)
        
        return NextResponse.json({ message: 'successful' }, { status: 200 });
    }
    catch(error){
        console.log('error')
        return NextResponse.json({ message: 'email send error' }, { status: 500 });
    }
   
}