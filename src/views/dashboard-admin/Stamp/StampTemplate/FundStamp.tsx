import { useEffect, useRef, useState } from "react";
import { useQRCode } from 'react-qrcode';
import Moment from 'moment';
import FundIdentified from 'assets/images/passport/fund-identified.png';
import { Grid } from "@mui/material";
import { businessAreas } from "constant";

const COVER = {
    fontSize: 80,
    fontFamily: 'Nunito Sans',
    fontWeight: 400,
    color: 'white',
    textAlign: 'left',
    textBaseline: 'top'
}
const CONTENT_STYLE = {
    fontSize: 45,
    fontFamily: 'Nunito Sans',
    fontWeight: 600,
    color: 'black',
    textAlign: 'left',
    textBaseline: 'top'
}

const QR_COVER = {
    X: 80,
    Y: 1500
}
const ISSUE_DATE = {
    X: 340,
    Y: 1500
}

const INCUBATOR_NAME = {
    X: 1450,
    Y: 620
}
const REPRESENTATIVE_NAME = {
    X: 2140,
    Y: 810
}
const HEADQUATER = {
    X: 1450,
    Y: 1020
}
const ESTABLISHED_DATE = {
    X: 1450,
    Y: 810
}
const FIELD_OF_BUSINESS = {
    X: 1450,
    Y: 1280
}

export default function FundStamp(props: { [x: string]: any; data: any; }) {

    const { data } = props;

    const [fundInformation, setFundInformation] = useState(data);

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
            img.src = FundIdentified;
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

    const formatIssueDate = (date: Date) => {
        if (!date) return "";
        return Moment(new Date(date)).format('MMMM  |  DD  |  YYYY');
    }

    const writeTextInTwoLine = (context: any, text: any, limitCharacterPerLine: number, location: any) => {
        const secondLineOffset = 70;
        if (!text) return;
        const splitedText = text.substring(limitCharacterPerLine);
        const spaceIndex = splitedText.indexOf(' ');
        if (text.length > limitCharacterPerLine && spaceIndex != -1) {
            const firstLine = text.substring(0, text.indexOf(' ', limitCharacterPerLine)).trim();
            const secondLine = text.substring(text.indexOf(' ', limitCharacterPerLine)).trim();
            writeText(context, { text: firstLine, x: location.X, y: location.Y }, CONTENT_STYLE);
            writeText(context, { text: secondLine, x: location.X, y: location.Y + secondLineOffset }, CONTENT_STYLE);
        } else {
            writeText(context, { text: text, x: location.X, y: location.Y }, CONTENT_STYLE);
        }
    }

    const writeFieldOfBusiness = (context: any) => {
        let yPosition = FIELD_OF_BUSINESS.Y;
        const maxLine = 10;
        if (Array.isArray(fundInformation.businessAreas)) {
            let wroteLine = 0;
            for (const businessArea of fundInformation.businessAreas) {
                if (wroteLine >= maxLine) break;
                const text = mappingBusinessName(businessArea);
                if (!text) continue;
                writeText(context, { text: text, x: FIELD_OF_BUSINESS.X, y: yPosition }, CONTENT_STYLE);
                yPosition += 70;
                wroteLine += 1;
            }
        }
    }

    const mappingBusinessName = (id: any) => {
        if (!id) return '';
        const businessArea = businessAreas.find((item: any) => item.value === id.value);
        if (businessArea) {
            return businessArea.label;
        } else {
            return id.value;
        };
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
        setPreview(FundIdentified);
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
                    drawImageProp(context, qrCodeImage, QR_COVER.X, QR_COVER.Y, 200, 200, 0, 0);
                    writeTextInTwoLine(context, fundInformation?.name?.toUpperCase(), 45, INCUBATOR_NAME);
                    writeTextInTwoLine(context, fundInformation?.officeAddress, 45, HEADQUATER);
                    writeTextInTwoLine(context, fundInformation?.contactRepresentative?.name, 16, REPRESENTATIVE_NAME);
                    writeText(context, { text: formatLaunchDate(fundInformation.createdAt), x: ESTABLISHED_DATE.X, y: ESTABLISHED_DATE.Y }, CONTENT_STYLE);
                    writeText(context, { text: formatIssueDate(new Date()), x: ISSUE_DATE.X, y: ISSUE_DATE.Y }, COVER);
                    writeFieldOfBusiness(context);

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
        if (fundInformation._id) {
            setQrCode(process.env.REACT_APP_BASE_URL_QR_FUND + fundInformation._id);
        }
    }, [fundInformation])

    useEffect(() => {
        setQrCodeLoaded(false);
        setFundInformation(data);
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