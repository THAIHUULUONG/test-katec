import { useEffect, useRef, useState } from "react";
import Moment from 'moment';
import PersonalIdentified from 'assets/images/passport/personal-identified.png';
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
    fontSize: 45,
    fontFamily: 'Nunito Sans',
    fontWeight: 600,
    color: 'black',
    textAlign: 'left',
    textBaseline: 'top'
}

const ACCEPT_DATE = {
    X: 80,
    Y: 1180
}

const GIVEN_NAME = {
    X: 1440,
    Y: 560
}

const SUR_NAME = {
    X: 2005,
    Y: 560
}

const SEX = {
    X: 2005,
    Y: 790
}

const NATIONALITY = {
    X: 1455,
    Y: 790
}

const DOB = {
    X: 1455,
    Y: 1000
}

const PASSPORT_NO = {
    X: 1455,
    Y: 1230
}

const POB = {
    X: 2005,
    Y: 1000
}

const NETWORK = {
    X: 2460,
    Y: 840
}

const AVATAR = {
    X: 2300,
    Y: 500
}

const LOCATION = {
    X: 1450,
    Y: 1060
}
const LOCATION_SECOND_LINE = {
    X: 1450,
    Y: 1140
}

export default function PersonalStamp(props: { [x: string]: any; data: any; }) {

    const { data } = props;

    const [personalInformation, setPersonalInformation] = useState(data);

    const [height, setHeight] = useState(0);
    const [width, setWidth] = useState(0);
    const [preview, setPreview] = useState('');

    //const [qrCodeLoaded, setQrCodeLoaded] = useState(false);
    const [backgroundLoaded, setbackgroundLoaded] = useState(false);
    const [avatarLoaded, setAvatarLoaded] = useState(false);

    //const [qrCodeImage, setQrCodeImage] = useState<HTMLImageElement>(new Image());
    const [background, setBackGround] = useState<HTMLImageElement>(new Image());
    const [avatar, setAvatar] = useState<HTMLImageElement>(new Image());

    const canvasRef = useRef<HTMLCanvasElement>(null);

    //const [qrCode, setQrCode] = useState("");
    //const qrCodeResponse = useQRCode(qrCode);

    const name = personalInformation?.name?.split(" ");
    const surname = name[0];
    const givenName = personalInformation?.name?.replace(surname, "");

    // const genQrCode = () => {
    //     try {
    //         const qrCodeImage = new Image();
    //         qrCodeImage.onload = () => {
    //             setQrCodeImage(qrCodeImage);
    //             setQrCodeLoaded(true);
    //         }
    //         qrCodeImage.src = qrCodeResponse || "";
    //     } catch (err) {
    //         console.log(err)
    //     }
    // }

    const calRatio = (img: any, width: any) => {
        var ratio = img.naturalWidth / img.naturalHeight;
        var height = width / ratio;
        return height;
    }

    const writeTextInTwoLine = (context: any, text: any, limitCharacterPerLine: number, location: any) => {
        const secondLineOffset = 70;
        if (!text) return;
        const splitedText = text.substring(limitCharacterPerLine);
        const spaceIndex = splitedText.indexOf(' ');
        if (text.length > limitCharacterPerLine && spaceIndex != -1) {
            const firstLine = text.substring(0, text.indexOf(' ', limitCharacterPerLine)).trim();
            const secondLine = text.substring(text.indexOf(' ', limitCharacterPerLine)).trim();
            console.log(context.measureText(firstLine));
            console.log(context.measureText(secondLine));
            writeText(context, { text: firstLine, x: location.X, y: location.Y }, CONTENT_STYLE);
            writeText(context, { text: secondLine, x: location.X, y: location.Y + secondLineOffset }, CONTENT_STYLE);
        } else {
            writeText(context, { text: text, x: location.X, y: location.Y }, CONTENT_STYLE);
        }
    }

    const loadBackground = () => {
        try {
            const img = new Image();
            img.src = PersonalIdentified;
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

    const loadAvatar = (data: any) => {
        try {
            const avatar = new Image();
            avatar.crossOrigin = "anonymous";
            avatar.src = data.portrait;
            avatar.onload = () => {
                setAvatar(avatar);
                setAvatarLoaded(true);
            }

        } catch (err) {
            console.log(err)
        }
    }

    const loadSex = (sex: any) => {
        if (sex == "1") {
            return "Male"
        } else {
            return "Female"
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
        const { fontSize = 55, fontFamily = 'Nunito', fontWeight = 500, color = 'black', textAlign = 'left', textBaseline = 'top' } = style;

        ctx.beginPath();
        ctx.font = fontWeight + ' ' + fontSize + 'px ' + fontFamily;
        ctx.textAlign = textAlign;
        ctx.textBaseline = textBaseline;
        ctx.fillStyle = color;
        ctx.fillText(text, x, y);
        ctx.stroke();
    }

    const formatAcceptDate = (date: Date) => {
        if (!date) return "";
        return Moment(new Date(date)).format('MMMM | DD | YYYY');
    }

    const formatPOB = (date: Date) => {
        if (!date) return "";
        return Moment(new Date(date)).format('DD/MM/YYYY');
    }

    const writeLocation = (context: any) => {
        const limitCharacterPerLine = 48;
        const address = personalInformation.incorporationAddress;
        if (!address) return;
        if (address.length > limitCharacterPerLine) {
            const firstLine = address.substring(0, address.indexOf(' ', limitCharacterPerLine)).trim();
            const secondLine = address.substring(address.indexOf(' ', limitCharacterPerLine)).trim();
            writeText(context, { text: firstLine, x: LOCATION.X, y: LOCATION.Y }, CONTENT_STYLE);
            writeText(context, { text: secondLine, x: LOCATION_SECOND_LINE.X, y: LOCATION_SECOND_LINE.Y }, CONTENT_STYLE);
        } else {
            writeText(context, { text: address, x: LOCATION.X, y: LOCATION.Y }, CONTENT_STYLE);
        }
    }

    const writeNetwork = (context: any) => {
        let yPosition = NETWORK.Y;
        if (Array.isArray(personalInformation.standards)) {
            for (const network of personalInformation.standards) {
                writeText(context, { text: network, x: NETWORK.X, y: yPosition }, CONTENT_STYLE);
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
        setPreview(PersonalIdentified);
        hideCanvas();
    }, []);

    // Render image when all resource loaded
    useEffect(() => {
        if (backgroundLoaded /*&& qrCodeLoaded*/ && avatarLoaded) {
            if (canvasRef.current) {
                const canvas = canvasRef.current;
                const context = canvas.getContext('2d');
                if (context) {
                    drawImageProp(context, background, 0, 0, context.canvas.width, context.canvas.height, 0, 0);
                    //drawImageProp(context, qrCodeImage, QR_COVER.X, QR_COVER.Y, 200, 200, 0, 0);
                    drawImageProp(context, avatar, AVATAR.X, AVATAR.Y, 300, calRatio(avatar, 300), 0, 0);
                    writeTextInTwoLine(context, givenName.toUpperCase(), 15, GIVEN_NAME);
                    //writeText(context, { text: surname.toUpperCase(), x: SUR_NAME.X, y: SUR_NAME.Y }, CONTENT_STYLE);
                    writeText(context, { text: surname.toUpperCase(), x: SUR_NAME.X, y: SUR_NAME.Y }, CONTENT_STYLE);
                    writeText(context, { text: personalInformation.identity?.cardId?.toUpperCase(), x: PASSPORT_NO.X, y: PASSPORT_NO.Y }, CONTENT_STYLE);
                    writeText(context, { text: personalInformation.nationality?.toUpperCase(), x: NATIONALITY.X, y: NATIONALITY.Y }, CONTENT_STYLE);
                    writeText(context, { text: loadSex(personalInformation.gender).toUpperCase(), x: SEX.X, y: SEX.Y }, CONTENT_STYLE);
                    writeText(context, { text: formatPOB(personalInformation.birthday), x: DOB.X, y: DOB.Y }, CONTENT_STYLE);
                    writeText(context, { text: personalInformation.placeOfBirth?.toUpperCase(), x: POB.X, y: POB.Y }, CONTENT_STYLE);
                    writeText(context, { text: formatAcceptDate(new Date()), x: ACCEPT_DATE.X, y: ACCEPT_DATE.Y }, COVER);
                    writeNetwork(context);
                    writeLocation(context);

                    const imageBase64 = canvas.toDataURL();
                    props.handleGetImageBase64(imageBase64);
                    setPreview(imageBase64);
                }
            }
        }
    }, [backgroundLoaded/*, qrCodeLoaded*/, avatarLoaded]);

    // useEffect(() => {
    //     if (qrCodeResponse) {
    //         genQrCode();
    //     }
    // }, [qrCodeResponse]);

    // useEffect(() => {
    //     if (personalInformation._id) {
    //         setQrCode(process.env.REACT_APP_BASE_URL_QR + personalInformation._id);
    //     }
    // }, [personalInformation])
    useEffect(() => {
        //setQrCodeLoaded(false);
        setAvatarLoaded(false);
        loadAvatar(data)
        setPersonalInformation(data);
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