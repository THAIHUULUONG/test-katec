import {
    Box,
    Grid,
    Link,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import SubCard from 'ui-component/cards/SubCard';
import { genderType, identityType } from 'constant';
import { useEffect, useState } from 'react';
import ModalProfile from 'ui-component/ModalProfile';
import { IconEditCircle } from '@tabler/icons';
import { useTheme } from '@mui/material/styles'
import Moment from 'moment';
import ImageZoomable from 'ui-component/ImageZoomable';
import TextFieldChange from './TextFieldChange';
import UpdatePassport from 'views/dashboard-admin/ProjectWaiting/Detail/UpdatePassport';



export enum ApplicationType {
    ProjectVerify = 1,
    InformationModify = 2
}


function DetailPer(props: { [x: string]: any; projectDetails: any; }) {
    const { projectDetails } = props;
    const [formValues, setFormValues] = useState(projectDetails);
    const [passportImage, setPassportImage] = useState('');
    const theme = useTheme();

    useEffect(() => {
        setFormValues(projectDetails);
    }, [props]);
    const getIdentityType = (idType: string) => {
        let identityLabel = "";
        // identityType.find(item => {
        //     if (item.value === idType) {
        //         identityLabel = item.label;
        //     }
        // })
        identityType.forEach(item => {
            if (item.value === idType) {
                identityLabel = item.label;
            }
        })
        return identityLabel;
    }

    const getGenderType = (idType: string) => {
        let genderLabel = "";
        // genderType.find((item) => {
        //     if (item.value === idType) {
        //         genderLabel = item.label;
        //     }
        // })
        genderType.forEach((item) => {
            if (item.value === idType) {
                genderLabel = item.label;
            }
        })
        return genderLabel;
    }

    const isFieldChanged = (key: any, isInLegalRepre?: boolean) => {
        const { fieldChanged } = projectDetails;
        if (!fieldChanged) return false;
        if (isInLegalRepre) {
            const legalRepre = fieldChanged.find((field: any) => typeof field == "object");
            if (legalRepre) {
                return legalRepre.identity.includes(key);
            } else {
                return false;
            }
        } else {
            return fieldChanged.includes(key);
        }
    }

    const AppliContent = (projectDetails && projectDetails.applicationType === ApplicationType.InformationModify ?
        (<Stack direction="row" alignItems="center"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: '25px'
            }}
        >
            <Box>
                <Typography variant="h4" color="initial" marginLeft={1}>C?? nh??n</Typography>
            </Box>
        </Stack>) : <Typography variant="h4" color="initial" marginLeft={1}>C?? nh??n</Typography>)

    const convertDate = (dateInput: Date) => {
        return Moment(new Date(dateInput)).format('DD-MM-YYYY');
    }


    return (
        <>
            <Grid container direction="column" spacing={3}>
                <Grid item xs={12}>
                    <SubCard
                        title={AppliContent}
                    >
                        <Grid container direction="row" spacing={2}>
                            <Grid item xs={12}>
                                <TableContainer>
                                    <Table
                                        sx={{
                                            '& td': {
                                                borderBottom: 'none',
                                            }
                                        }}
                                        // size="small"
                                        style={{ tableLayout: 'fixed' }}
                                    >
                                        <colgroup>
                                            <col width="35%" />
                                            <col width="65%" />
                                        </colgroup>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell variant="head" sx={{ display: 'flex' }}>H??? v?? t??n &nbsp;{isFieldChanged('name') && <TextFieldChange />}</TableCell>
                                                <TableCell>{formValues?.name}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell variant="head" sx={{ display: 'flex' }}>Ng??y sinh &nbsp;{isFieldChanged('birthday') && <TextFieldChange />}</TableCell>
                                                <TableCell>{convertDate(formValues?.birthday)}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell variant="head" sx={{ display: 'flex' }}>Gi???i t??nh &nbsp;{isFieldChanged('gender') && <TextFieldChange />}</TableCell>
                                                <TableCell>{formValues?.gender && getGenderType(formValues?.gender)} &nbsp;{isFieldChanged('identity?.type') && <TextFieldChange />}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell variant="head" sx={{ display: 'flex' }}>Qu???c t???ch &nbsp;{isFieldChanged('nationality') && <TextFieldChange />}</TableCell>
                                                <TableCell>{formValues?.nationality}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell variant="head" sx={{ display: 'flex' }}>N??i sinh &nbsp;{isFieldChanged('placeOfBirth') && <TextFieldChange />}</TableCell>
                                                <TableCell>{formValues?.placeOfBirth}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell variant="head" sx={{ display: 'flex' }}>?????a ch??? li??n l???c &nbsp;{isFieldChanged('address') && <TextFieldChange />}</TableCell>
                                                <TableCell>{formValues.address}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell variant="head" sx={{ display: 'flex' }}>S??? ??i???n tho???i &nbsp;{isFieldChanged('phone') && <TextFieldChange />}</TableCell>
                                                <TableCell>{formValues.phone}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell variant="head" sx={{ display: 'flex' }}>Email &nbsp;{isFieldChanged('email') && <TextFieldChange />}</TableCell>
                                                <TableCell>{formValues.email}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell variant="head" sx={{ display: 'flex' }}>?????a ch??? v?? &nbsp;{isFieldChanged('ownerAddress') && <TextFieldChange />} </TableCell>
                                                <TableCell>{formValues.ownerAddress}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell sx={{ p: 0 }}>
                                                    <Typography variant="h5" color="initial" padding={2}>M???ng x?? h???i &nbsp;{isFieldChanged("socialWebs") && <IconEditCircle color={theme.palette.primary.dark} />}</Typography>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell colSpan={2}>
                                                    <TableContainer>
                                                        <Table
                                                            sx={{
                                                                '& td': {
                                                                    borderBottom: 'none'
                                                                }
                                                            }}
                                                            size="small"
                                                        >
                                                            <TableHead>
                                                                <TableRow sx={{ backgroundColor: "#F4F4F4" }}>
                                                                    <TableCell align="left">N???n t???ng</TableCell>
                                                                    <TableCell align="left">???????ng d???n</TableCell>
                                                                </TableRow>
                                                            </TableHead>

                                                            <TableBody>
                                                                {formValues.socialWebs?.map((social: any, index: any) =>
                                                                    <TableRow>
                                                                        <TableCell align="left">{social.name}</TableCell>
                                                                        <TableCell align="left"><Link href={social.link} target='_blank'>{social.link}</Link></TableCell>
                                                                    </TableRow>
                                                                )}
                                                            </TableBody>
                                                            <colgroup>
                                                                <col width="35%" />
                                                                <col width="65%" />
                                                            </colgroup>
                                                        </Table>
                                                    </TableContainer>
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="h5" color="initial" padding={2}>Gi???y t??? t??y th??n</Typography>
                                <TableContainer sx={{ padding: 2 }}>
                                    <Table>
                                        <TableHead>
                                            <TableRow sx={{ backgroundColor: "#F4F4F4" }}>
                                                <TableCell align="left">{formValues?.identity?.type && getIdentityType(formValues?.identity?.type)} &nbsp;{isFieldChanged('type', true) && <IconEditCircle color={theme.palette.primary.dark} />}</TableCell>
                                                <TableCell align="left">M???t tr?????c th??? &nbsp;{isFieldChanged('frontIdImage', true) && <IconEditCircle color={theme.palette.primary.dark} />}</TableCell>
                                                <TableCell align="left">M???t sau th??? &nbsp;{isFieldChanged('backIdImage', true) && <IconEditCircle color={theme.palette.primary.dark} />}</TableCell>
                                                <TableCell align="left">???nh selfie c???m gi???y t??? t??y th??n &nbsp;{isFieldChanged('portrait') && <IconEditCircle color={theme.palette.primary.dark} />}</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell align="left">{formValues?.identity?.cardId}</TableCell>
                                                <TableCell align="left">{formValues?.identity?.frontIdImage && <ImageZoomable imageUrl={formValues?.identity?.frontIdImage} width={150} />}</TableCell>
                                                <TableCell align="left">{formValues?.identity?.backIdImage && <ImageZoomable imageUrl={formValues?.identity?.backIdImage} width={150} />}</TableCell>
                                                <TableCell align="left">{formValues?.portrait && <ImageZoomable imageUrl={formValues?.portrait} width={150} />}</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Grid>
                            <Grid item xs={12}>
                                <UpdatePassport projectData={projectDetails} handleSetPassportImage={setPassportImage}> </UpdatePassport>
                            </Grid>
                            <Grid item xs={12} sx={{ pb: 5 }} >
                                <ModalProfile projectDetails={projectDetails} passportImage={passportImage}> </ModalProfile>
                            </Grid>
                        </Grid>
                    </SubCard>
                </Grid>
            </Grid>
        </>
    );
}
export default DetailPer;