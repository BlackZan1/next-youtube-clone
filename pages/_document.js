import Document, { Html, Head, NextScript, Main } from 'next/document';

export default class MyDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <link href={'https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600&display=swap'} rel='stylesheet' />                
                    <link rel='icon' href='/favicon.png' />
                </Head>

                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}