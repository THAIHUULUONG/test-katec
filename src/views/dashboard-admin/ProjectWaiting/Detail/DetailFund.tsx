import {
    Grid,
    Table,
    TableBody,
    TableContainer,
    TableRow,
    Typography,
    TableCell,
    TableHead,
    Link
} from '@mui/material';
import {
    CircularProgress
} from '@mui/material';
import SubCard from 'ui-component/cards/SubCard';
import axios from 'utils/axios';
import { useEffect, useState } from 'react';
import ModalProfile from 'ui-component/ModalProfile';
import Moment from 'moment';
import { businessAreas, roundList } from 'constant';
import { IconEditCircle } from '@tabler/icons';
import { useTheme } from '@mui/material/styles'
import ImageZoomable from 'ui-component/ImageZoomable';
import TextFieldChange from './TextFieldChange';
import UpdatePassport from 'views/dashboard-admin/ProjectWaiting/Detail/UpdatePassport';
const convertDate = (dateInput: Date) => {
    return Moment(new Date(dateInput)).format('DD-MM-YYYY');
}
export const convertRound = (idType: string) => {
    let identityLabel = "";
    // roundList.find(item => {
    //     if (item.value == idType) {
    //         identityLabel = item.name;
    //     } 
    // })
    roundList.forEach(item => {
        if (item.value == idType) {
            identityLabel = item.name;
        }
    })
    return identityLabel;
}
export const getBussinessAreasLabel = (values: any) => {
    if (values && values.length) {
        const newValues = values.map((value: any) => {
            const businessArea = businessAreas.find(item => item.value == value.value);
            if (businessArea) {
                return businessArea.label;
            } else {
                return value.value;
            }
        })
        return newValues.join(', ')
    } else {
        return values;
    }
}

function DetailFund(props: { [x: string]: any; projectDetails: any; }) {
    const { projectDetails } = props;
    const [formValues, setFormValues] = useState(projectDetails);
    const [loading, setLoading] = useState(true);
    const [investProject, setInvestProject] = useState<any>();
    const [passportImage, setPassportImage] = useState('');
    const theme = useTheme();
    const isFieldChanged = (key: any, iscontactRepresentative?: boolean) => {
        const { fieldChanged } = projectDetails;
        if (!fieldChanged) return false;
        if (iscontactRepresentative) {
            const contactRepresentative = fieldChanged.find((field: any) => typeof field == "object");
            if (contactRepresentative) {
                return contactRepresentative.contactRepresentative.includes(key);
            } else {
                return false;
            }
        } else {
            return fieldChanged.includes(key);
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
        // investProject && investProject.find((item:any) => {
        //     if (item._id == idType) {
        //         identityLabel = item.name;
        //     } 
        // })
        investProject.forEach((item: any) => {
            if (item._id == idType) {
                identityLabel = item.name;
            }
        })
        return identityLabel;
    }

    return (
        !loading ?
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
                                                <TableCell variant="head">Logo &nbsp;{isFieldChanged('logo') && <TextFieldChange />}</TableCell>
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
                                                <TableCell variant="head" sx={{ display: 'flex' }}>Giấy tờ thành lập &nbsp;{isFieldChanged("establishmentPapers") && <TextFieldChange />}</TableCell>
                                                <TableCell>{projectDetails?.establishmentPapers && <Link href={projectDetails?.establishmentPapers} target="_blank">Giấy tờ thành lập </Link>}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell variant="head" sx={{ display: 'flex' }}>Tên đơn vị &nbsp;{isFieldChanged('name') && <TextFieldChange />}</TableCell>
                                                <TableCell>{formValues.name}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell variant="head" sx={{ display: 'flex' }}>Ngày thành lập &nbsp;{isFieldChanged('establishedDate') && <TextFieldChange />}</TableCell>
                                                <TableCell>{convertDate(formValues.establishedDate)}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell variant="head" sx={{ display: 'flex' }}>Địa chỉ trụ sở/Địa chỉ hoạt động &nbsp;{isFieldChanged('officeAddress') && <TextFieldChange />}</TableCell>
                                                <TableCell>{formValues.officeAddress}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell variant="head" sx={{ display: 'flex' }}>Lĩnh vực kinh doanh &nbsp;{isFieldChanged("businessAreas") && <IconEditCircle color={theme.palette.primary.dark} />}</TableCell>
                                                <TableCell>{getBussinessAreasLabel(formValues.businessAreas)}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell variant="head" sx={{ display: 'flex' }}>Ví/TK thể hiện lịch sử đầu tư &nbsp;{isFieldChanged('ownerAddress') && <TextFieldChange />}</TableCell>
                                                <TableCell>{formValues.ownerAddress}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell variant="head" sx={{ display: 'flex' }}>Mô tả, giới thiệu dự án &nbsp;{isFieldChanged("description") && <TextFieldChange />}</TableCell>
                                                <TableCell>{formValues?.description}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell variant="head" sx={{ display: 'flex' }}>Tên người đại diện pháp luật &nbsp;{isFieldChanged('legalRepresentative') && <TextFieldChange />}</TableCell>
                                                <TableCell>{formValues.legalRepresentative}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell sx={{ p: 0 }}>
                                                    <Typography variant="h5" color="initial" padding={2}>Người đại diện liên hệ &nbsp;{isFieldChanged("teamInfomation") && <TextFieldChange />}</Typography>
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
                                                                    <TableCell align="left">Tên người đại diện</TableCell>
                                                                    <TableCell align="left">Số điện thoại</TableCell>
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
                                                    <Typography variant="h5" color="initial" padding={2}>Thông tin đội ngũ &nbsp;{isFieldChanged("teamInfomation") && <IconEditCircle color={theme.palette.primary.dark} />}</Typography>
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
                                                    <Typography variant="h5" color="initial" padding={2}>Mạng xã hội &nbsp;{isFieldChanged("socialWebs") && <TextFieldChange />}</Typography>
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
                                                                {formValues.socialWebs?.map((social: any, index: number) =>
                                                                    <TableRow key={index}>
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
                                                                <Typography variant="h5" color="initial" padding={2}>Dự án đã đầu tư &nbsp;{isFieldChanged("investedProjects") && <TextFieldChange />}</Typography>
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
                            </Grid>
                            <Grid item xs={12}>
                                <UpdatePassport projectData={projectDetails} handleSetPassportImage={setPassportImage}> </UpdatePassport>
                            </Grid>
                        </Grid>
                        <SubCard>
                            <Grid item xs={12} sx={{ pb: 5 }} >
                                <ModalProfile projectDetails={projectDetails} passportImage={passportImage}> </ModalProfile>
                            </Grid>
                        </SubCard>
                    </SubCard>
                </Grid>
            </Grid>
            :
            <CircularProgress />
    );
}
export default DetailFund;
