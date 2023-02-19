import {
    FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup
} from '@mui/material';
import { IconCode, IconFolder, IconLockOpen, IconMoodSmile } from "@tabler/icons";
import { useEffect, useState } from "react";
import SubCard from 'ui-component/cards/SubCard';

export default function RadioRate(props: { [x: string]: any; nftInformation: any }) {
    const { nftInformation } = props;

    const [initValue] = useState<any>({
        legalRating: nftInformation.legalRating,
        technologyRating: nftInformation.technologyRating,
        socialValue: nftInformation.socialValue,
        communityReputation: nftInformation.communityReputation
    });

    const [data, setData] = useState<any>({
        legalRating: nftInformation.legalRating ? nftInformation.legalRating : "0",
        technologyRating: nftInformation.technologyRating ? nftInformation.technologyRating : "0",
        socialValue: nftInformation.socialValue ? nftInformation.socialValue : "0",
        communityReputation: nftInformation.communityReputation ? nftInformation.communityReputation : "0"
    });

    const handleRadioRating = (event: { target: { value: any } }, fieldName: string) => {
        const { value } = event.target;
        setData({
            ...data,
            [fieldName]: value,
        });
    };

    useEffect(() => {
        props.handleGetRadio(data);
    }, [data]);

    return <>
        <Grid container direction="row" spacing={2}>
            <Grid item xs={12} sm={6}>
                <SubCard>
                    <Grid container direction="row" spacing={2}>
                        <Grid item xs={12} sm={3} alignItems="center" >
                            <SubCard sx={{ bgcolor: '#E3F2FD', color: '#2196F3', textAlign: 'center' }} >
                                <IconFolder />
                            </SubCard>
                        </Grid>
                        <Grid item xs={12} sm={9}>
                            <FormControl>
                                <FormLabel sx={{ fontWeight: 'bold', fontSize: '18px' }} id="legalRating">Pháp lý</FormLabel>
                                <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    defaultValue={nftInformation.legalRating != undefined ? initValue.legalRating : "0"}
                                    name="radio-buttons-group"
                                    onChange={(event) => handleRadioRating(event, 'legalRating')}
                                >
                                    <FormControlLabel value="20" control={<Radio />} label="Rủi ro thấp" />
                                    <FormControlLabel value="10" control={<Radio />} label="Rủi ro cao" />
                                    <FormControlLabel value="30" control={<Radio />} label="Chưa thấy rủi ro" />
                                    <FormControlLabel value="0" control={<Radio />} label="Không có thông tin" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                    </Grid>
                </SubCard>
            </Grid>

            <Grid item xs={12} sm={6}>
                <SubCard>
                    <Grid container direction="row" spacing={2}>
                        <Grid item xs={12} sm={3} alignItems="center" >
                            <SubCard sx={{ bgcolor: '#EDE7F6', color: '#673AB7', textAlign: 'center' }} >
                                <IconCode />
                            </SubCard>
                        </Grid>
                        <Grid item xs={12} sm={9}>
                            <FormControl>
                                <FormLabel sx={{ fontWeight: 'bold', fontSize: '18px' }} id="technologyRating">Mức độ công nghệ</FormLabel>
                                <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    defaultValue={nftInformation.technologyRating != undefined ? initValue.technologyRating : "0"}
                                    name="radio-buttons-group"
                                    onChange={(event) => handleRadioRating(event, 'technologyRating')}
                                >
                                    <FormControlLabel value="30" control={<Radio />} label="Có khả năng ứng dụng cao" />
                                    <FormControlLabel value="20" control={<Radio />} label="Có khả năng ứng dụng" />
                                    <FormControlLabel value="10" control={<Radio />} label="Chưa nhận thấy khả năng ứng dụng" />
                                    <FormControlLabel value="0" control={<Radio />} label="Không có thông tin" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                    </Grid>
                </SubCard>
            </Grid>

            <Grid item xs={12} sm={6}>
                <SubCard>
                    <Grid container direction="row" spacing={2}>
                        <Grid item xs={12} sm={3} alignItems="center" >
                            <SubCard sx={{ bgcolor: '#FFF0DF', color: '#F9A138', textAlign: 'center' }} >
                                <IconMoodSmile />
                            </SubCard>
                        </Grid>
                        <Grid item xs={12} sm={9}>
                            <FormControl>
                                <FormLabel sx={{ fontWeight: 'bold', fontSize: '18px' }} id="socialValue">Giá trị xã hội</FormLabel>
                                <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    defaultValue={nftInformation.socialValue != undefined ? initValue.socialValue : "0"}
                                    name="radio-buttons-group"
                                    onChange={(event) => handleRadioRating(event, 'socialValue')}
                                >
                                    <FormControlLabel value="30" control={<Radio />} label="Có tiềm năng đóng góp cao cho xã hội" />
                                    <FormControlLabel value="20" control={<Radio />} label="Có tiềm năng đóng góp cho xã hội" />
                                    <FormControlLabel value="10" control={<Radio />} label="Chưa nhận thấy tiềm năng đóng góp cho xã hội" />
                                    <FormControlLabel value="0" control={<Radio />} label="Không có thông tin" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                    </Grid>
                </SubCard>
            </Grid>

            <Grid item xs={12} sm={6}>
                <SubCard>
                    <Grid container direction="row" spacing={2}>
                        <Grid item xs={12} sm={3} alignItems="center" >
                            <SubCard sx={{ bgcolor: '#F0FFD9', color: '#81D401', textAlign: 'center' }} >
                                <IconLockOpen />
                            </SubCard>
                        </Grid>
                        <Grid item xs={12} sm={9}>
                            <FormControl>
                                <FormLabel sx={{ fontWeight: 'bold', fontSize: '18px' }} id="communityReputation">Uy tín cộng đồng</FormLabel>
                                <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    defaultValue={nftInformation.communityReputation != undefined ? initValue.communityReputation : "0"}
                                    name="radio-buttons-group"
                                    onChange={(event) => handleRadioRating(event, 'communityReputation')}
                                >
                                    <FormControlLabel value="30" control={<Radio />} label="Có nhiều thông tin tích cực" />
                                    <FormControlLabel value="10" control={<Radio />} label="Có một số thông tin tiêu cực" />
                                    <FormControlLabel value="20" control={<Radio />} label="Chưa tìm thấy thông tin tiêu cực" />
                                    <FormControlLabel value="0" control={<Radio />} label="Không có thông tin" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                    </Grid>
                </SubCard>
            </Grid>
        </Grid >
    </>

}