// material-ui
import {
    Card, CardHeader, Collapse, Divider, IconButton,
    Link, Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Stack,
    Box,
    Typography,
    Button
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { openSnackbar } from "store/slices/snackbar";
import { useEffect, useState } from 'react';
import axios from 'utils/axios';
import { identityType } from 'constant';
// custom component
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import Moment from 'moment';
import MainCard from 'ui-component/cards/MainCard';
import ImageZoomable from 'ui-component/ImageZoomable';
import SubCard from 'ui-component/cards/SubCard';
import { dispatch } from 'store';
import { useNavigate } from "react-router-dom";
import { getBussinessAreasLabel } from 'views/dashboard-admin/ProjectWaiting/Detail/DetailFund';


export default function BussinessDetails(props: { projectDetails: any; }) {
    const [businessProject, setbusinessProject] = useState<any>({} as any);
    const [organizationOpen, setOrganizationOpen] = useState(true);
    const [projectOpen, setProjectOpen] = useState(true);
    const [tokenomicsOpen, setTokenomicsOpen] = useState(true);
    const [legalOpen, setLegalOpen] = useState(true);
    const theme = useTheme();
    let navigate = useNavigate();

    async function isActive(type: any) {
        if (type == "deactive") {
            const response = await axios.put(
                `/project/deactive/${businessProject._id}?projectType=${businessProject.projectType}`,
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
                `/project/active/${businessProject._id}?projectType=${businessProject.projectType}`,
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
        if (props && props.projectDetails) {
            setbusinessProject({ ...props.projectDetails });
        }
    }, [props])

    const getIdentityType = (idType: string) => {
        let identityLabel = "";
        // identityType.find(item => {
        //     if (item.value == idType) {
        //         identityLabel = item.label;
        //     }
        // });
        identityType.forEach(item => {
            if (item.value == idType) {
                identityLabel = item.label;
            }
        });
        return identityLabel;
    }

    const convertDate = (dateInput: Date) => {
        return Moment(new Date(dateInput)).format('DD-MM-YYYY');
    }

    return (
        <>
            <MainCard>
                <Card
                    sx={{
                        width: '100%',
                    }}
                >
                    <CardHeader
                        sx={{ p: 2.5, width: '100%' }}
                        title={<Typography
                            variant="h4"
                            sx={{ display: 'flex', alignItems: "center" }}
                        >
                            Tổ chức
                        </Typography>}
                        action={<IconButton aria-label="expand row" size="small" onClick={() => setOrganizationOpen(!organizationOpen)}>
                            {organizationOpen ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                        </IconButton>}
                        onClick={() => setOrganizationOpen(!organizationOpen)}
                    />
                    <Divider
                        sx={{
                            opacity: 1,
                            mb: 1,
                            borderColor: theme.palette.mode === 'dark' ? theme.palette.dark.light + 15 : theme.palette.primary.light
                        }}
                    />
                    <Collapse in={organizationOpen} timeout="auto" unmountOnExit sx={{ padding: 2 }}>
                        {organizationOpen && (
                            <TableContainer>
                                <Table
                                    sx={{
                                        '& td': {
                                            borderBottom: 'none'
                                        }
                                    }}
                                    size="small"
                                >
                                    <colgroup>
                                        <col width="35%" />
                                        <col width="65%" />
                                    </colgroup>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell variant="head" sx={{ display: 'flex' }}>Tên tổ chức</TableCell>
                                            <TableCell>{businessProject.incorporationName}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell variant="head" sx={{ display: 'flex' }} >Trụ sở</TableCell>
                                            <TableCell>{businessProject.incorporationAddress}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell variant="head" sx={{ display: 'flex' }}>Lĩnh vực kinh doanh</TableCell>
                                            <TableCell>{getBussinessAreasLabel(businessProject.businessAreas)}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell variant="head" sx={{ display: 'flex' }}>Mã số thuế</TableCell>
                                            <TableCell>{businessProject.taxCode}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell variant="head" sx={{ display: 'flex' }}>Mã số doanh nghiệp/ Số giấy phép phát hành</TableCell>
                                            <TableCell>{businessProject.companyCode}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell variant="head" sx={{ display: 'flex' }}>Giấy phép đăng ký kinh doanh</TableCell>
                                            <TableCell>{
                                                businessProject.businessLicense && <Link href={businessProject.businessLicense} target="_blank">Giấy phép đăng ký kinh doanh</Link>
                                            }</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell variant="head" sx={{ display: 'flex' }}>Ngày phát hành</TableCell>
                                            <TableCell>{convertDate(businessProject.createdAt)}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell variant="head" sx={{ display: 'flex' }}>Tên giao dịch</TableCell>
                                            <TableCell>{businessProject.transactionName}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell variant="head" sx={{ display: 'flex' }}>Địa chỉ giao dịch</TableCell>
                                            <TableCell>{businessProject.transactionAddress}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell variant="head" sx={{ display: 'flex' }}>Địa chỉ nhận NFT</TableCell>
                                            <TableCell>{businessProject.ownerAddress}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        )}
                    </Collapse>
                </Card>
                <Card
                    sx={{
                        width: '100%',
                    }}
                >
                    <CardHeader
                        sx={{ p: 2.5, width: '100%' }}
                        title={<Typography
                            variant="h4"
                            sx={{ display: 'flex', alignItems: "center" }}
                        >
                            Dự án
                        </Typography>}
                        action={<IconButton aria-label="expand row" size="small" onClick={() => setProjectOpen(!projectOpen)}>
                            {projectOpen ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                        </IconButton>}
                        onClick={() => setProjectOpen(!projectOpen)}
                    />
                    <Divider
                        sx={{
                            opacity: 1,
                            borderColor: theme.palette.mode === 'dark' ? theme.palette.dark.light + 15 : theme.palette.primary.light,
                            mb: 1
                        }}
                    />
                    <Collapse in={projectOpen} timeout="auto" unmountOnExit sx={{ padding: 2 }}>
                        {projectOpen && (
                            <>
                                <TableContainer>
                                    <Table
                                        sx={{
                                            '& td': {
                                                borderBottom: 'none'
                                            }
                                        }}
                                        size="small"
                                    >
                                        <colgroup>
                                            <col width="35%" />
                                            <col width="65%" />
                                        </colgroup>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell variant="head" sx={{ display: 'flex' }}>Tên dự án</TableCell>
                                                <TableCell>{businessProject?.name}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell variant="head" sx={{ display: 'flex' }}>Logo</TableCell>
                                                <TableCell>{
                                                    businessProject?.logo
                                                        ?
                                                        <ImageZoomable
                                                            imageUrl={businessProject?.logo}
                                                            width={150}
                                                        />
                                                        :
                                                        "Không có tệp"
                                                }</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell variant="head" sx={{ display: 'flex' }}>Mô tả, giới thiệu dự án</TableCell>
                                                <TableCell>{businessProject?.description}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell variant="head" sx={{ display: 'flex' }}>Whitepaper</TableCell>
                                                <TableCell>{businessProject?.whitepaper && <Link href={businessProject?.whitepaper} target="_blank">whitepaper</Link>}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell variant="head" sx={{ display: 'flex' }}>Websites</TableCell>
                                                <TableCell>{businessProject.websites && businessProject.websites?.map((website: any, index: any, array: any) => {
                                                    if (index == (array.length - 1) || array.length == 1) {
                                                        return <Link key={index} href={website} target="_blank">{website}</Link>;
                                                    } else {
                                                        return <><Link key={index} href={website} target="_blank">{website}</Link><br /></>;
                                                    }
                                                })}</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                <Typography variant="h5" color="initial" padding={2}>Đội ngũ phát triển</Typography>
                                <TableContainer sx={{ padding: 2 }}>
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
                                                <TableCell align="left">Tên</TableCell>
                                                <TableCell align="left">Chức danh</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <colgroup>
                                            <col width="30%" />
                                            <col width="30%" />
                                            <col width="40%" />
                                        </colgroup>
                                        <TableBody>
                                            {businessProject?.developmentTeam?.map((devTeam: any, index: any) =>
                                                <TableRow key={index}>
                                                    <TableCell align="left">{devTeam.image && <ImageZoomable imageUrl={devTeam.image} width={100} />}</TableCell>
                                                    <TableCell align="left">{devTeam.name}</TableCell>
                                                    <TableCell align="left">{devTeam.position}</TableCell>
                                                </TableRow>
                                            )}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                <Typography variant="h5" color="initial" padding={2}>Đối tác phát triển</Typography>
                                <TableContainer sx={{ padding: 2 }}>
                                    <Table
                                        sx={{
                                            '& td': {
                                                borderBottom: 'none'
                                            }
                                        }}
                                        size="small">
                                        <TableHead>
                                            <TableRow sx={{ backgroundColor: "#F4F4F4" }}>
                                                <TableCell align="left">Ảnh đại diện</TableCell>
                                                <TableCell align="left">Tên</TableCell>
                                                <TableCell align="left">Website</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <colgroup>
                                            <col width="30%" />
                                            <col width="30%" />
                                            <col width="40%" />
                                        </colgroup>
                                        <TableBody>
                                            {businessProject.developmentPartner?.map((partnerTeam: any, index: any) =>
                                                <TableRow key={index}>
                                                    <TableCell align="left">{partnerTeam.image && <ImageZoomable imageUrl={partnerTeam.image} width={100} />}</TableCell>
                                                    <TableCell align="left">{partnerTeam.name}</TableCell>
                                                    <TableCell align="left"><Link href={partnerTeam.website} target="_blank">{partnerTeam.website}</Link></TableCell>
                                                </TableRow>
                                            )}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                <Typography variant="h5" color="initial" padding={2}>Mạng xã hội</Typography>
                                <TableContainer sx={{ padding: 2 }}>
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
                                            <col width="30%" />
                                            <col width="70%" />
                                        </colgroup>
                                        <TableBody>
                                            {businessProject.socialWebs?.map((social: any, index: any) =>
                                                <TableRow key={index}>
                                                    <TableCell align="left">{social.name}</TableCell>
                                                    <TableCell align="left"><Link href={social.link} target='_blank'>{social.link}</Link></TableCell>
                                                </TableRow>
                                            )}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </>
                        )}
                    </Collapse>
                </Card>
                <Card
                    sx={{
                        width: '100%',
                    }}
                >
                    <CardHeader
                        sx={{ p: 2.5, width: '100%' }}
                        title={<Typography
                            variant="h4"
                            sx={{ display: 'flex', alignItems: "center" }}
                        >
                            Tỉ lệ phân bổ token
                        </Typography>}
                        action={<IconButton aria-label="expand row" size="small" onClick={() => setTokenomicsOpen(!tokenomicsOpen)}>
                            {tokenomicsOpen ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                        </IconButton>}
                        onClick={() => setTokenomicsOpen(!tokenomicsOpen)}
                    />
                    <Divider
                        sx={{
                            opacity: 1,
                            borderColor: theme.palette.mode === 'dark' ? theme.palette.dark.light + 15 : theme.palette.primary.light,
                            mb: 1
                        }}
                    />
                    <Collapse in={tokenomicsOpen} timeout="auto" unmountOnExit sx={{ padding: 2 }}>
                        {tokenomicsOpen && (
                            <>
                                <TableContainer>
                                    <Table
                                        sx={{
                                            '& td': {
                                                borderBottom: 'none'
                                            }
                                        }}
                                        size="small"
                                    >
                                        <colgroup>
                                            <col width="35%" />
                                            <col width="65%" />
                                        </colgroup>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell variant="head" sx={{ display: 'flex' }}>Tên gọi token</TableCell>
                                                <TableCell>{businessProject.tokenName}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell variant="head" sx={{ display: 'flex' }}>Ký hiệu</TableCell>
                                                <TableCell>{businessProject.symbol}</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                <Typography variant="h5" color="initial" padding={2}>Smart Contracts</Typography>
                                <TableContainer sx={{ padding: 2 }}>
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
                                                <TableCell align="left">Chuẩn</TableCell>
                                                <TableCell align="left">Địa chỉ contract</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <colgroup>
                                            <col width="30%" />
                                            <col width="70%" />
                                        </colgroup>
                                        <TableBody>
                                            {businessProject.contracts?.map((contract: any, index: any) =>
                                                <TableRow key={index}>
                                                    <TableCell align="left">{contract.standard}</TableCell>
                                                    <TableCell align="left">{contract.smartContractAddress}</TableCell>
                                                </TableRow>
                                            )}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                <Typography variant="h5" color="initial" padding={2}>Tỉ lệ phân bổ</Typography>
                                <TableContainer sx={{ padding: 2 }}>
                                    <Table>
                                        <TableHead>
                                            <TableRow sx={{ backgroundColor: "#F4F4F4" }}>
                                                <TableCell align="left">Tên phân bổ</TableCell>
                                                <TableCell align="left">Tỉ lệ</TableCell>
                                                <TableCell align="left">Số lượng</TableCell>
                                                <TableCell align="left">Kế hoạch Vesting</TableCell>
                                                <TableCell align="left">Thời gian Vesting</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {businessProject.tokenAllocations?.map((tokenAllocation: any, index: any) =>
                                                <TableRow key={index}>
                                                    <TableCell align="left">{tokenAllocation.allocationName}</TableCell>
                                                    <TableCell align="left">{tokenAllocation.rate}</TableCell>
                                                    <TableCell align="left">{tokenAllocation.amount}</TableCell>
                                                    <TableCell align="left">{tokenAllocation.vestingSchedule}</TableCell>
                                                    <TableCell align="left">{tokenAllocation.vestingTime}</TableCell>
                                                </TableRow>
                                            )}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </>
                        )}
                    </Collapse>
                </Card>
                <Card
                    sx={{
                        width: '100%',
                    }}
                >
                    <CardHeader
                        sx={{ p: 2.5, width: '100%' }}
                        title={<Typography
                            variant="h4"
                            sx={{ display: 'flex', alignItems: "center" }}
                        >
                            Đại diện pháp lý
                        </Typography>}
                        action={<IconButton aria-label="expand row" size="small" onClick={() => setLegalOpen(!legalOpen)}>
                            {legalOpen ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                        </IconButton>}
                        onClick={() => setLegalOpen(!legalOpen)}
                    />
                    <Divider
                        sx={{
                            opacity: 1,
                            borderColor: theme.palette.mode === 'dark' ? theme.palette.dark.light + 15 : theme.palette.primary.light,
                            mb: 1
                        }}
                    />
                    <Collapse in={legalOpen} timeout="auto" unmountOnExit sx={{ padding: 2 }}>
                        {legalOpen && (
                            <TableContainer>
                                <Table sx={{
                                    '& td': {
                                        borderBottom: 'none'
                                    }
                                }}
                                    size="small">
                                    <colgroup>
                                        <col width="35%" />
                                        <col width="65%" />
                                    </colgroup>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell variant="head" sx={{ display: 'flex' }}>Họ và tên</TableCell>
                                            <TableCell>{businessProject?.legalRepresentative?.name}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell variant="head" sx={{ display: 'flex' }}>Ngày sinh</TableCell>
                                            <TableCell>{convertDate(businessProject?.legalRepresentative?.dob)}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell variant="head" sx={{ display: 'flex' }}>Địa chỉ</TableCell>
                                            <TableCell>{businessProject?.legalRepresentative?.address}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell variant="head" sx={{ display: 'flex' }}>Email</TableCell>
                                            <TableCell>{businessProject?.legalRepresentative?.email}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell variant="head" sx={{ display: 'flex' }}>{businessProject?.fieldChanged === ""} Số điện thoại</TableCell>
                                            <TableCell>{businessProject?.legalRepresentative?.phone}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell variant="head" sx={{ display: 'flex' }}>Chức danh</TableCell>
                                            <TableCell>{businessProject?.legalRepresentative?.position}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell variant="head" sx={{ display: 'flex' }}>Loại thẻ</TableCell>
                                            <TableCell>{
                                                businessProject?.legalRepresentative?.identity?.type && getIdentityType(businessProject?.legalRepresentative?.identity?.type)
                                            }</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell variant="head" sx={{ display: 'flex' }}>Số thẻ</TableCell>
                                            <TableCell>{businessProject?.legalRepresentative?.identity?.cardId}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell variant="head" sx={{ display: 'flex' }}>Mặt trước thẻ</TableCell>
                                            <TableCell>{businessProject?.legalRepresentative?.frontIdImage && <ImageZoomable imageUrl={businessProject.legalRepresentative?.frontIdImage} width={150} />}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell variant="head" sx={{ display: 'flex' }}>Mặt sau thẻ</TableCell>
                                            <TableCell>{businessProject?.legalRepresentative?.backIdImage && <ImageZoomable imageUrl={businessProject?.legalRepresentative?.backIdImage} width={150} />}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        )}
                    </Collapse>
                    <SubCard title="THAY ĐỔI TRẠNG THÁI">
                        <Stack direction="row">
                            <Box>
                                {
                                    ((businessProject?.isActive == true) || (businessProject?.isActive == "1"))
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
                </Card>
            </MainCard>

        </>
    );
}