import {
    Grid,
    Table,
    TableBody,
    TableContainer,
    TableRow,
    Typography,
    Box,
    TableCell,
    TableHead,
    Link,
    Stack,
    Button
} from '@mui/material';
import {
    CircularProgress
} from '@mui/material';
import SubCard from 'ui-component/cards/SubCard';
import axios from 'utils/axios';
import { openSnackbar } from "store/slices/snackbar";
import { useDispatch } from "react-redux";
import { useEffect, useState } from 'react';
import Moment from 'moment';
import { roundList } from 'constant';
import { useTheme } from '@mui/material/styles'
import ImageZoomable from 'ui-component/ImageZoomable';
import { useNavigate } from "react-router-dom";
import { getBussinessAreasLabel } from 'views/dashboard-admin/ProjectWaiting/Detail/DetailFund';

const convertDate = (dateInput: Date) => {
    return Moment(new Date(dateInput)).format('DD-MM-YYYY');
}
export const convertRound = (idType: string) => {
    let identityLabel = "";
    roundList.forEach(item => {
        if (item.value == idType) {
            identityLabel = item.name;
        }
    });
    return identityLabel;
}
function FundDetails(props: { [x: string]: any; projectDetails: any; }) {
    const { projectDetails } = props;
    const [formValues, setFormValues] = useState(projectDetails);
    const [loading, setLoading] = useState(true);
    const [investProject, setInvestProject] = useState<any>();
    const theme = useTheme();
    let navigate = useNavigate();

    const dispatch = useDispatch();
    async function isActive(type: any) {
        if (type == "deactive") {
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
    useEffect(() => {
        getListProject();
    }, [])
    const getListProject = async () => {
        setLoading(true);
        try {
            const res = await axios.get(
                `/project/typeAdmin?projectType=1`
            );
            setInvestProject(res.data)
            setLoading(false);
        } catch (e) { }
    }
    const getNameFromProject = (idType: string) => {
        let identityLabel = "";
        // investProject && investProject.find((item: any) => {
        //     if (item._id == idType) {
        //         identityLabel = item.name;
        //     }
        // })
        investProject.forEach((item: any) => {
            if (item._id == idType) {
                identityLabel = item.name;
            }
        });
        return identityLabel;
    }

    return (
        !loading ?
            <>
                <Grid container direction="column" spacing={3}>
                    <Grid item xs={12}>
                        <SubCard
                            title="Quỹ đầu tư"
                        >
                            <Grid container direction="row" spacing={2}>
                                <Grid item xs={12}>
                                    <TableContainer>
                                        <Table sx={{
                                            [`& td`]: {
                                                borderBottom: "none",
                                                width: '50%'
                                            }
                                        }}
                                            style={{ tableLayout: 'fixed' }}
                                        >
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell variant="head">Logo</TableCell>
                                                    <TableCell>{
                                                        formValues?.logo
                                                            ?
                                                            <ImageZoomable
                                                                imageUrl={formValues?.logo}
                                                                width={150}
                                                            />
                                                            :
                                                            "Không có tệp"
                                                    }</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell variant="head" sx={{ display: 'flex' }}>Giấy tờ thành lập</TableCell>
                                                    <TableCell>{projectDetails?.establishmentPapers && <Link href={projectDetails?.establishmentPapers} target="_blank">Giấy tờ thành lập </Link>}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell variant="head" sx={{ display: 'flex' }}>Tên đơn vị</TableCell>
                                                    <TableCell>{formValues.name}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell variant="head" sx={{ display: 'flex' }}>Ngày thành lập</TableCell>
                                                    <TableCell>{convertDate(formValues.establishedDate)}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell variant="head" sx={{ display: 'flex' }}>Địa chỉ trụ sở/Địa chỉ hoạt động</TableCell>
                                                    <TableCell>{formValues.officeAddress}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell variant="head" sx={{ display: 'flex' }}>Lĩnh vực kinh doanh</TableCell>
                                                    <TableCell>{getBussinessAreasLabel(projectDetails.businessAreas)}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell variant="head" sx={{ display: 'flex' }}>Ví/TK thể hiện lịch sử đầu tư</TableCell>
                                                    <TableCell>{formValues.ownerAddress}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell variant="head" sx={{ display: 'flex' }}>Mô tả, giới thiệu dự án</TableCell>
                                                    <TableCell>{formValues?.description}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell variant="head" sx={{ display: 'flex' }}>Tên người đại diện pháp luật</TableCell>
                                                    <TableCell>{formValues.legalRepresentative}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell sx={{ p: 0 }}>
                                                        <Typography variant="h5" color="initial" padding={2}>Người đại diện liên hệ</Typography>
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
                                                                        <TableCell align="left">Họ Tên</TableCell>
                                                                        <TableCell align="left">Số Điện Thoại</TableCell>
                                                                        <TableCell align="left">Email</TableCell>
                                                                    </TableRow>
                                                                </TableHead>
                                                                <colgroup>
                                                                    <col width="30%" />
                                                                    <col width="30%" />
                                                                    <col width="40%" />
                                                                </colgroup>
                                                                <TableBody>
                                                                    <TableRow>
                                                                        <TableCell align="left">{formValues?.contactRepresentative?.name}</TableCell>
                                                                        <TableCell align="left">{formValues?.contactRepresentative?.phone}</TableCell>
                                                                        <TableCell align="left">{formValues?.contactRepresentative?.email}</TableCell>
                                                                    </TableRow>
                                                                </TableBody>
                                                            </Table>
                                                        </TableContainer>
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell sx={{ p: 0 }}>
                                                        <Typography variant="h5" color="initial" padding={2}>Thông tin đội ngũ</Typography>
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
                                                                        <TableCell align="left">Ảnh đại diện</TableCell>
                                                                        <TableCell align="left">Tên thành viên</TableCell>
                                                                        <TableCell align="left">Chức vụ</TableCell>
                                                                    </TableRow>
                                                                </TableHead>
                                                                <colgroup>
                                                                    <col width="30%" />
                                                                    <col width="30%" />
                                                                    <col width="40%" />
                                                                </colgroup>
                                                                <TableBody>
                                                                    {formValues.teamInfomation?.map((teamInfomation: any, index: number) =>
                                                                        <TableRow key={index}>
                                                                            <TableCell align="left">{teamInfomation.image && <ImageZoomable imageUrl={teamInfomation.image} width={100} />}</TableCell>
                                                                            <TableCell align="left">{teamInfomation.name}</TableCell>
                                                                            <TableCell align="left">{teamInfomation.position}</TableCell>
                                                                        </TableRow>
                                                                    )}
                                                                </TableBody>
                                                            </Table>
                                                        </TableContainer>
                                                    </TableCell>
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
                                                                <colgroup>
                                                                    <col width="35%" />
                                                                    <col width="65%" />
                                                                </colgroup>
                                                                <TableBody>
                                                                    {formValues.socialWebs?.map((social: any) =>
                                                                        <TableRow>
                                                                            <TableCell align="left">{social.name}</TableCell>
                                                                            <TableCell align="left"><Link href={social.link} target='_blank'>{social.link}</Link></TableCell>
                                                                        </TableRow>
                                                                    )}
                                                                </TableBody>
                                                            </Table>
                                                        </TableContainer>
                                                    </TableCell>
                                                </TableRow>
                                                {
                                                    formValues?.investedProjects?.length > 0 &&
                                                    (
                                                        <>
                                                            <TableRow>
                                                                <TableCell sx={{ p: 0 }}>
                                                                    <Typography variant="h5" color="initial" padding={2}>Dự án đã đầu tư</Typography>
                                                                </TableCell>
                                                            </TableRow>
                                                            <TableRow>
                                                                <TableCell colSpan={2}>
                                                                    <Table
                                                                        sx={{
                                                                            '& td': {
                                                                                borderBottom: 'none'
                                                                            }
                                                                        }}
                                                                    >
                                                                        <TableHead>
                                                                            <TableRow sx={{ backgroundColor: "#F4F4F4" }}>
                                                                                <TableCell align="left" sx={{ width: '20%!important' }}>Dự án</TableCell>
                                                                                <TableCell align="left" sx={{ width: '15%!important' }}>Số vốn</TableCell>
                                                                                <TableCell align="left" sx={{ width: '15%!important' }}>Ngày tài trợ</TableCell>
                                                                                <TableCell align="left" sx={{ width: '20%!important' }}>Vòng gọi vốn</TableCell>
                                                                                <TableCell align="left" sx={{ width: '30%' }}>Link thông báo đầu tư vào các dự án</TableCell>
                                                                            </TableRow>
                                                                        </TableHead>
                                                                        <TableBody>
                                                                            {formValues.investedProjects?.map((investedProject: any, index: number) =>
                                                                                <TableRow key={index}>
                                                                                    <TableCell align="left" sx={{ width: '20%!important' }}>{getNameFromProject(investedProject.projectId)}</TableCell>
                                                                                    <TableCell align="left" sx={{ width: '15%!important' }}>{investedProject.capAmount}</TableCell>
                                                                                    <TableCell align="left" sx={{ width: '15%!important' }}>{convertDate(investedProject.fundedDate)}</TableCell>
                                                                                    <TableCell align="left" sx={{ width: '20%!important' }}>{convertRound(investedProject.round)}</TableCell>
                                                                                    <TableCell align="left" sx={{ width: '30%!important' }}><Link href={investedProject.link} target='_blank'>{investedProject.link}</Link></TableCell>
                                                                                </TableRow>
                                                                            )}
                                                                        </TableBody>
                                                                    </Table>
                                                                </TableCell>
                                                            </TableRow>
                                                        </>
                                                    )
                                                }
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
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
                                </Grid>
                            </Grid>
                        </SubCard>
                    </Grid>
                </Grid>
            </>
            :
            <CircularProgress />
    );
}
export default FundDetails;
