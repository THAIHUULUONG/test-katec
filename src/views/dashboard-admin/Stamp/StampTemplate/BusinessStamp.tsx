import { useEffect, useRef, useState } from "react";
import { useQRCode } from 'react-qrcode';
import Moment from 'moment';
import BusinessIdentified from 'assets/images/passport/business-identified.png';
import { Grid } from "@mui/material";

const COVER = {
    fontSize: 80,
    fontFamily: 'Nunito Sans',
    fontWeight: 400,
    color: 'white',
    textAlign: 'left',
    textBaseline: 'top'
}
const CONTENT_STYLE = {
    fontSize: 47,
    fontFamily: 'Nunito Sans',
    fontWeight: 500,
    color: 'black',
    textAlign: 'left',
    textBaseline: 'top'
}

const CONTENT_STYLE_SMALL = {
    fontSize: 45,
    fontFamily: 'Nunito Sans',
    fontWeight: 500,
    color: 'black',
    textAlign: 'left',
    textBaseline: 'top'
}

const QR_COVER = {
    X: 80,
    Y: 1270
}
const ACCEPT_DATE = {
    X: 80,
    Y: 1050
}

const PROJECT_NAME = {
    X: 1450,
    Y: 620
}
const SYMBOL = {
    X: 2140,
    Y: 620
}
const LAUNCH_DATE = {
    X: 1450,
    Y: 840
}
const LOCATION = {
    X: 1450,
    Y: 1060
}
const LOCATION_SECOND_LINE = {
    X: 1450,
    Y: 1140
}
const SMART_CONTRACT = {
    X: 1450,
    Y: 1350
}

export default function BussinessStamp(props: { [x: string]: any; data: any; }) {

    const { data } = props;

    const [businessInformation, setBusinessInformation] = useState(data);

    const [height, setHeight] = useState(0);
    const [width, setWidth] = useState(0);
    const [preview, setPreview] = useState('');

    const [qrCodeLoaded, setQrCodeLoaded] = useState(false);
    const [backgroundLoaded, setbackgroundLoaded] = useState(false);

    const [qrCodeImage, setQrCodeImage] = useState<HTMLImageElement>(new Image());
    const [background, setBackGround] = useState<HTMLImageElement>(new Image());

    const canvasRef = useRef<HTMLCanvasElement>(null);

    const [qrCode, setQrCode] = useState("");
    const qrCodeResponse = useQRCode(qrCode);

    const genQrCode = () => {
        try {
            const qrCodeImage = new Image();
            qrCodeImage.onload = () => {
                setQrCodeImage(qrCodeImage);
                setQrCodeLoaded(true);
            }
            qrCodeImage.src = qrCodeResponse || "";
        } catch (err) {
            console.log(err)
        }
    }

    const loadBackground = () => {
        try {
            const img = new Image();
            img.src = BusinessIdentified;
            img.onload = () => {
                setHeight(img.height);
                setWidth(img.width);
                setBackGround(img);
                setbackgroundLoaded(true);
            }
        } catch (err) {
            console.log(err)
        }
    }

    const drawImageProp = (ctx: any, img: any, x: any, y: any, w: any, h: any, offsetX: any, offsetY: any) => {

        // default offset is center
        offsetX = typeof offsetX === "number" ? offsetX : 0.5;
        offsetY = typeof offsetY === "number" ? offsetY : 0.5;

        // keep bounds [0.0, 1.0]
        if (offsetX < 0) offsetX = 0;
        if (offsetY < 0) offsetY = 0;
        if (offsetX > 1) offsetX = 1;
        if (offsetY > 1) offsetY = 1;

        var iw = img.width,
            ih = img.height,
            r = Math.min(w / iw, h / ih),
            nw = iw * r,   // new prop. width
            nh = ih * r,   // new prop. height
            cx, cy, cw, ch, ar = 1;

        // decide which gap to fill    
        if (nw < w) ar = w / nw;
        if (Math.abs(ar - 1) < 1e-14 && nh < h) ar = h / nh;  // updated
        nw *= ar;
        nh *= ar;

        // calc source rectangle
        cw = iw / (nw / w);
        ch = ih / (nh / h);

        cx = (iw - cw) * offsetX;
        cy = (ih - ch) * offsetY;

        // make sure source rectangle is valid
        if (cx < 0) cx = 0;
        if (cy < 0) cy = 0;
        if (cw > iw) cw = iw;
        if (ch > ih) ch = ih;

        // fill image in dest. rectangle
        ctx.drawImage(img, cx, cy, cw, ch, x, y, w, h);
    }

    const writeText = (ctx: any, info: any, style: any) => {
        const { text, x, y } = info;
        const { fontSize = 55, fontFamily = 'Nunito Sans', fontWeight = 500, color = 'black', textAlign = 'left', textBaseline = 'top' } = style;

        ctx.beginPath();
        ctx.font = fontWeight + ' ' + fontSize + 'px ' + fontFamily;
        ctx.textAlign = textAlign;
        ctx.textBaseline = textBaseline;
        ctx.fillStyle = color;
        ctx.fillText(text, x, y);
        ctx.stroke();
    }

    const formatLaunchDate = (date: Date) => {
        if (!date) return "";
        return Moment(new Date(date)).format('DD/MM/YYYY');
    }

    const formatAcceptDate = (date: Date) => {
        if (!date) return "";
        return Moment(new Date(date)).format('MMMM | DD | YYYY');
    }

    const writeLocation = (context: any) => {
        const limitCharacterPerLine = 48;
        const address = businessInformation.incorporationAddress;
        if (!address) return;
        const splitedText = address.substring(limitCharacterPerLine);
        const spaceIndex = splitedText.indexOf(' ');
        if (address.length > limitCharacterPerLine && spaceIndex != -1) {
            const firstLine = address.substring(0, address.indexOf(' ', limitCharacterPerLine)).trim();
            const secondLine = address.substring(address.indexOf(' ', limitCharacterPerLine)).trim();
            writeText(context, { text: firstLine, x: LOCATION.X, y: LOCATION.Y }, CONTENT_STYLE);
            writeText(context, { text: secondLine, x: LOCATION_SECOND_LINE.X, y: LOCATION_SECOND_LINE.Y }, CONTENT_STYLE);
        } else {
            writeText(context, { text: address, x: LOCATION.X, y: LOCATION.Y }, CONTENT_STYLE);
        }
    }

    const writeSmartContracts = (context: any) => {
        let yPosition = SMART_CONTRACT.Y;
        if (Array.isArray(businessInformation.contracts)) {
            for (const contract of businessInformation.contracts) {
                const text = contract.standard + ': ' + contract.smartContractAddress?.toLowerCase();
                writeText(context, { text: text, x: SMART_CONTRACT.X, y: yPosition }, CONTENT_STYLE_SMALL);
                yPosition += 70;
            }
        }
    }

    const hideCanvas = () => {
        if (canvasRef.current) {
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d');
            if (context) {
                context.canvas.hidden = true;
            }
        }
    }

    useEffect(() => {
        loadBackground();
        setPreview(BusinessIdentified);
        hideCanvas();
    }, []);

    // Render image when all resource loaded
    useEffect(() => {
        if (backgroundLoaded && qrCodeLoaded) {
            if (canvasRef.current) {
                const canvas = canvasRef.current;
                const context = canvas.getContext('2d');
                if (context) {
                    drawImageProp(context, background, 0, 0, context.canvas.width, context.canvas.height, 0, 0);
                    // drawImageProp(context, qrCodeImage, QR.X, QR.Y, 200, 200, 0, 0);
                    drawImageProp(context, qrCodeImage, QR_COVER.X, QR_COVER.Y, 200, 200, 0, 0);
                    writeText(context, { text: businessInformation?.name?.toUpperCase(), x: PROJECT_NAME.X, y: PROJECT_NAME.Y }, CONTENT_STYLE);
                    writeText(context, { text: businessInformation.symbol?.toUpperCase(), x: SYMBOL.X, y: SYMBOL.Y }, CONTENT_STYLE);
                    writeText(context, { text: formatLaunchDate(businessInformation.createdAt), x: LAUNCH_DATE.X, y: LAUNCH_DATE.Y }, CONTENT_STYLE);
                    writeText(context, { text: formatAcceptDate(new Date()), x: ACCEPT_DATE.X, y: ACCEPT_DATE.Y }, COVER);

                    writeSmartContracts(context);
                    writeLocation(context);

                    const imageBase64 = canvas.toDataURL();
                    props.handleGetImageBase64(imageBase64);
                    setPreview(imageBase64);
                }
            }
        }
    }, [backgroundLoaded, qrCodeLoaded]);


    useEffect(() => {
        if (qrCodeResponse) {
            genQrCode();
        }
    }, [qrCodeResponse]);

    useEffect(() => {
        if (businessInformation._id) {
            setQrCode(process.env.REACT_APP_BASE_URL_QR_BUSINESS + businessInformation._id);
        }
    }, [businessInformation])

    useEffect(() => {
        setQrCodeLoaded(false);
        setBusinessInformation(data);
    }, [props.data]);

    return <>
        <Grid container spacing={1} sx={{ mt: 0.5, mb: 2 }} alignItems="center">
            <Grid item xs={12} lg={12} style={{ textAlign: "center" }}>
                <canvas ref={canvasRef} id="nft-stamp" width={width} height={height}></canvas>
                {preview && <img src={preview} alt="No" style={{ width: 1000 }}></img>}
            </Grid>
        </Grid>
    </>

}