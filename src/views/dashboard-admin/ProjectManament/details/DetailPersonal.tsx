// material-ui
import {
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Stack,
    Box,
    Button,
    Link,
    Typography,
    TableHead
} from '@mui/material';
import SubCard from 'ui-component/cards/SubCard';
import { useTheme } from '@mui/material/styles';
import { openSnackbar } from "store/slices/snackbar";
import { genderType, identityType } from 'constant';
import Moment from 'moment';
import axios from 'utils/axios';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

// assets
import { useEffect, useState } from 'react';
import ImageZoomable from 'ui-component/ImageZoomable';
function PersonalDetails(props: { [x: string]: any; projectDetails: any; }) {

    const { projectDetails } = props;

    const [formValues, setFormValues] = useState(projectDetails);

    const theme = useTheme();
    const dispatch = useDispatch();
    let navigate = useNavigate();

    async function isActive(type: any) {
        if (type === "deactive") {
            const response = await axios.put(
                `/project/deactive/${projectDetails._id}?projectType=${projectDetails.projectType}`,
            );
            if (response.status === 200) {
                dispatch(
                    openSnackbar({
                        open: true,
                        message: 'Thành công',
                        variant: 'alert',
                        alert: {
                            color: 'success'
                        },
                        close: false
                    })
                );
                navigate('/manage-project')
            } else {
                dispatch(
                    openSnackbar({
                        open: true,
                        message: 'Thất bại',
                        variant: 'alert',
                        alert: {
                            color: 'error'
                        },
                        close: false
                    })
                );
            }
        } else {
            const response = await axios.put(
                `/project/active/${projectDetails._id}?projectType=${projectDetails.projectType}`,
            );
            if (response.status === 200) {
                dispatch(
                    openSnackbar({
                        open: true,
                        message: 'Thành công',
                        variant: 'alert',
                        alert: {
                            color: 'success'
                        },
                        close: false
                    })
                );
                navigate('/manage-project')
            } else {
                dispatch(
                    openSnackbar({
                        open: true,
                        message: 'Thất bại',
                        variant: 'alert',
                        alert: {
                            color: 'error'
                        },
                        close: false
                    })
                );
            }
        }
    }

    useEffect(() => {
        setFormValues(projectDetails);
    }, [props])

    const getIdentityType = (idType: string) => {
        let identityLabel = "";
        // identityType.find(item => {
        //     if (item.value == idType) {
        //         identityLabel = item.label;
        //     }
        // })
        identityType.forEach(item => {
            if (item.value == idType) {
                identityLabel = item.label;
            }
        });
        return identityLabel;
    }

    const getGenderType = (idType: string) => {
        let genderLabel = "";
        // genderType.find(item => {
        //     if (item.value == idType) {
        //         genderLabel = item.label;
        //     }
        // })
        genderType.forEach(item => {
            if (item.value == idType) {
                genderLabel = item.label;
            }
        });
        return genderLabel;
    }

    const convertDate = (dateInput: Date) => {
        return Moment(new Date(dateInput)).format('DD-MM-YYYY');
    }

    return (
        <>
            <Grid container direction="column" spacing={3}>
                <Grid item xs={12}>
                    <SubCard
                        title="Cá nhân"
                    >
                        <Grid container direction="row" spacing={2}>
                            <Grid item xs={12}>
                                <TableContainer>
                                    <Table
                                        sx={{
                                            '& td': {
                                                borderBottom: 'none'
                                            }
                                        }}
                                        style={{ tableLayout: 'fixed' }}
                                    >
                                        <colgroup>
                                            <col width="35%" />
                                            <col width="65%" />
                                        </colgroup>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell variant="head" sx={{ display: 'flex' }}>Họ và tên</TableCell>
                                                <TableCell>{formValues?.name}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell variant="head" sx={{ display: 'flex' }}>Ngày sinh</TableCell>
                                                <TableCell>{convertDate(formValues?.birthday)}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell variant="head" sx={{ display: 'flex' }}>Giới tính</TableCell>
                                                <TableCell>{formValues?.gender && getGenderType(formValues?.gender)}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell variant="head" sx={{ display: 'flex' }}>Quốc tịch</TableCell>
                                                <TableCell>{formValues?.nationality}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell variant="head" sx={{ display: 'flex' }}>Nơi sinh</TableCell>
                                                <TableCell>{formValues?.placeOfBirth}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell variant="head" sx={{ display: 'flex' }}>Địa chỉ liên lạc</TableCell>
                                                <TableCell>{formValues.address}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell variant="head" sx={{ display: 'flex' }}>Số điện thoại</TableCell>
                                                <TableCell>{formValues.phone}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell variant="head" sx={{ display: 'flex' }}>Email</TableCell>
                                                <TableCell>{formValues.email}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell variant="head" sx={{ display: 'flex' }}>Địa chỉ ví </TableCell>
                                                <TableCell>{formValues.ownerAddress}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell sx={{ p: 0 }}>
                                                    <Typography variant="h5" color="initial" padding={2}>Mạng xã hội</Typography>
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
                                                                    <TableCell align="left">Nền tảng</TableCell>
                                                                    <TableCell align="left">Đường dẫn</TableCell>
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
                                <Typography variant="h5" color="initial" padding={2}>Giấy tờ tùy thân</Typography>
                                <TableContainer sx={{ padding: 2 }}>
                                    <Table>
                                        <TableHead>
                                            <TableRow sx={{ backgroundColor: "#F4F4F4" }}>
                                                <TableCell align="left">{formValues?.identity?.type && getIdentityType(formValues?.identity?.type)}</TableCell>
                                                <TableCell align="left">Mặt trước thẻ</TableCell>
                                                <TableCell align="left">Mặt sau thẻ</TableCell>
                                                <TableCell align="left">Ảnh selfie cầm giấy tờ tùy thân</TableCell>
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
                        </Grid>
                        <SubCard title="THAY ĐỔI TRẠNG THÁI">
                            <Stack direction="row">
                                <Box>
                                    {
                                        ((formValues?.isActive == true) || (formValues?.isActive == "1"))
                                            ?
                                            <Button onClick={(e) => isActive("deactive")} variant="contained" type="submit" sx={{ background: theme.palette.error.main, '&:hover': { background: theme.palette.error.dark } }}>
                                                Ẩn dự án
                                            </Button>
                                            :
                                            <Button onClick={(e) => isActive("active")} variant="contained" type="submit" sx={{
                                                background: theme.palette.success.dark,
                                                '&:hover': { background: theme.palette.success.main },
                                                ml: 2
                                            }}>
                                                Công khai dự án
                                            </Button>
                                    }
                                </Box>
                            </Stack>
                        </SubCard>
                    </SubCard>
                </Grid>
            </Grid>
        </>
    );
}

export default PersonalDetails;