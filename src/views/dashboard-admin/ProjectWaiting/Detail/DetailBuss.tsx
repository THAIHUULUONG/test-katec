import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import UpdatePassport from 'views/dashboard-admin/ProjectWaiting/Detail/UpdatePassport';
import {
    Card, CardHeader, Collapse, Divider, IconButton,
    Link,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow, Typography, Grid
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { identityType } from 'constant';
import Moment from 'moment';
import { useState } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import SubCard from 'ui-component/cards/SubCard';
import ImageZoomable from 'ui-component/ImageZoomable';
import ModalProfile from 'ui-component/ModalProfile';
import { getBussinessAreasLabel } from './DetailFund';
import TextFieldChange from './TextFieldChange';

const convertDate = (dateInput: Date) => {
    return Moment(new Date(dateInput)).format('DD-MM-YYYY');
}

export enum ApplicationType {
    ProjectVerify = 1,
    InformationModify = 2
}

export default function DetailBuss(props: { projectDetails: any; }) {
    const { projectDetails } = props;
    const [organizationOpen, setOrganizationOpen] = useState(true);
    const [projectOpen, setProjectOpen] = useState(true);
    const [tokenomicsOpen, setTokenomicsOpen] = useState(true);
    const [legalOpen, setLegalOpen] = useState(true);
    const theme = useTheme();
    const [passportImage, setPassportImage] = useState('');

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

    const isFieldChanged = (key: any, isInLegalRepre?: boolean) => {
        const { fieldChanged } = projectDetails;
        if (!fieldChanged) return false;
        if (isInLegalRepre) {
            const legalRepre = fieldChanged.find((field: any) => typeof field == "object");
            if (legalRepre) {
                return legalRepre.legalRepresentative.includes(key);
            } else {
                return false;
            }
        } else {
            return fieldChanged.includes(key);
        }
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
                                            <TableCell variant="head" sx={{ display: 'flex' }}>Tên tổ chức &nbsp;{isFieldChanged('incorporationName') && <TextFieldChange />} </TableCell>
                                            <TableCell>{projectDetails.incorporationName}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell variant="head" sx={{ display: 'flex' }} >Trụ sở &nbsp;{isFieldChanged("incorporationAddress") && <TextFieldChange />}</TableCell>
                                            <TableCell>{projectDetails.incorporationAddress}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell variant="head" sx={{ display: 'flex' }}>Lĩnh vực kinh doanh &nbsp;{isFieldChanged("businessAreas") && <TextFieldChange />}</TableCell>
                                            <TableCell>{getBussinessAreasLabel(projectDetails.businessAreas)}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell variant="head" sx={{ display: 'flex' }}>Mã số thuế &nbsp;{isFieldChanged("taxCode") && <TextFieldChange />}</TableCell>
                                            <TableCell>{projectDetails.taxCode}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell variant="head" sx={{ display: 'flex' }}>Mã số doanh nghiệp/ Số giấy phép phát hành &nbsp;{isFieldChanged("companyCode") && <TextFieldChange />}</TableCell>
                                            <TableCell>{projectDetails.companyCode}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell variant="head" sx={{ display: 'flex' }}>Giấy phép đăng ký kinh doanh &nbsp;{isFieldChanged("businessLicense") && <TextFieldChange />}</TableCell>
                                            <TableCell>{projectDetails.businessLicense && <Link href={projectDetails.businessLicense} target="_blank">Giấy phép đăng ký kinh doanh</Link>}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell variant="head" sx={{ display: 'flex' }}>Ngày phát hành &nbsp;{isFieldChanged("createdAt") && <TextFieldChange />}</TableCell>
                                            <TableCell>{convertDate(projectDetails.createdAt)}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell variant="head" sx={{ display: 'flex' }}>Tên giao dịch &nbsp;{isFieldChanged("transactionName") && <TextFieldChange />}</TableCell>
                                            <TableCell>{projectDetails.transactionName}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell variant="head" sx={{ display: 'flex' }}>Địa chỉ giao dịch &nbsp;{isFieldChanged("transactionAddress") && <TextFieldChange />}</TableCell>
                                            <TableCell>{projectDetails.transactionAddress}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell variant="head" sx={{ display: 'flex' }}>Địa chỉ nhận NFT &nbsp;{isFieldChanged("ownerAddress") && <TextFieldChange />}</TableCell>
                                            <TableCell>{projectDetails.ownerAddress}</TableCell>
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
                                                <TableCell variant="head" sx={{ display: 'flex' }}>Tên dự án &nbsp;{isFieldChanged("name") && <TextFieldChange />}</TableCell>
                                                <TableCell>{projectDetails?.name}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell variant="head" sx={{ display: 'flex' }}>Logo &nbsp;{isFieldChanged("logo") && <TextFieldChange />}</TableCell>
                                                <TableCell>{
                                                    projectDetails?.logo
                                                        ?
                                                        <ImageZoomable
                                                            imageUrl={projectDetails?.logo}
                                                            width={150}
                                                        />
                                                        :
                                                        "Không có tệp"
                                                }</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell variant="head" sx={{ display: 'flex' }}>Mô tả, giới thiệu dự án &nbsp;{isFieldChanged("description") && <TextFieldChange />}</TableCell>
                                                <TableCell>{projectDetails?.description}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell variant="head" sx={{ display: 'flex' }}>Whitepaper &nbsp;{isFieldChanged("whitepaper") && <TextFieldChange />}</TableCell>
                                                <TableCell>{projectDetails?.whitepaper && <Link href={projectDetails?.whitepaper} target="_blank">whitepaper</Link>}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell variant="head" sx={{ display: 'flex' }}>Websites &nbsp;{isFieldChanged("websites") && <TextFieldChange />}</TableCell>
                                                <TableCell>{projectDetails.websites && projectDetails.websites?.map((website: any, index: any, array: any) => {
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
                                <Typography variant="h5" color="initial" padding={2}>Đội ngũ phát triển  &nbsp;{isFieldChanged("developmentTeam") && <TextFieldChange />}</Typography>
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
                                            {projectDetails?.developmentTeam?.map((devTeam: any, index: any) =>
                                                <TableRow key={index}>
                                                    <TableCell align="left">{devTeam.image && <ImageZoomable imageUrl={devTeam.image} width={100} />}</TableCell>
                                                    <TableCell align="left">{devTeam.name}</TableCell>
                                                    <TableCell align="left">{devTeam.position}</TableCell>
                                                </TableRow>
                                            )}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                <Typography variant="h5" color="initial" padding={2}>Đối tác phát triển &nbsp;{isFieldChanged("developmentPartner") && <TextFieldChange />}</Typography>
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
                                            {projectDetails.developmentPartner?.map((partnerTeam: any, index: any) =>
                                                <TableRow key={index}>
                                                    <TableCell align="left">{partnerTeam.image && <ImageZoomable imageUrl={partnerTeam.image} width={100} />}</TableCell>
                                                    <TableCell align="left">{partnerTeam.name}</TableCell>
                                                    <TableCell align="left"><Link href={partnerTeam.website} target="_blank">{partnerTeam.website}</Link></TableCell>
                                                </TableRow>
                                            )}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                <Typography variant="h5" color="initial" padding={2}>Mạng xã hội &nbsp;{isFieldChanged("socialWebs") && <TextFieldChange />}</Typography>
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
                                            {projectDetails.socialWebs?.map((social: any, index: any) =>
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
                                                <TableCell variant="head" sx={{ display: 'flex' }}>Tên gọi token &nbsp;{isFieldChanged("tokenName") && <TextFieldChange />}</TableCell>
                                                <TableCell>{projectDetails.tokenName}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell variant="head" sx={{ display: 'flex' }}>Ký hiệu &nbsp;{isFieldChanged("symbol") && <TextFieldChange />}</TableCell>
                                                <TableCell>{projectDetails.symbol}</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                <Typography variant="h5" color="initial" padding={2}>Smart Contracts  &nbsp;{isFieldChanged("contracts") && <TextFieldChange />}</Typography>
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
                                            {projectDetails.contracts?.map((contract: any, index: any) =>
                                                <TableRow key={index}>
                                                    <TableCell align="left">{contract.standard}</TableCell>
                                                    <TableCell align="left">{contract.smartContractAddress}</TableCell>
                                                </TableRow>
                                            )}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                <Typography variant="h5" color="initial" padding={2}>Tỉ lệ phân bổ  &nbsp;{isFieldChanged("tokenAllocation") && <TextFieldChange />}</Typography>
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
                                            {projectDetails.tokenAllocations?.map((tokenAllocation: any, index: any) =>
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
                                            <TableCell variant="head" sx={{ display: 'flex' }}>Họ và tên &nbsp;{isFieldChanged("name", true) && <TextFieldChange />}</TableCell>
                                            <TableCell>{projectDetails?.legalRepresentative?.name}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell variant="head" sx={{ display: 'flex' }}>Ngày sinh &nbsp;{isFieldChanged("dob", true) && <TextFieldChange />}</TableCell>
                                            <TableCell>{convertDate(projectDetails?.legalRepresentative?.dob)}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell variant="head" sx={{ display: 'flex' }}>Địa chỉ &nbsp;{isFieldChanged("address", true) && <TextFieldChange />}</TableCell>
                                            <TableCell>{projectDetails?.legalRepresentative?.address}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell variant="head" sx={{ display: 'flex' }}>Email &nbsp;{isFieldChanged("email", true) && <TextFieldChange />}</TableCell>
                                            <TableCell>{projectDetails?.legalRepresentative?.email}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell variant="head" sx={{ display: 'flex' }}>{projectDetails?.fieldChanged === ""} Số điện thoại &nbsp;{isFieldChanged("phone", true) && <TextFieldChange />}</TableCell>
                                            <TableCell>{projectDetails?.legalRepresentative?.phone}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell variant="head" sx={{ display: 'flex' }}>Chức danh &nbsp;{isFieldChanged("position", true) && <TextFieldChange />}</TableCell>
                                            <TableCell>{projectDetails?.legalRepresentative?.position}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell variant="head" sx={{ display: 'flex' }}>Loại thẻ &nbsp;{isFieldChanged("type", true) && <TextFieldChange />}</TableCell>
                                            <TableCell>{
                                                projectDetails.legalRepresentative.identity?.type && getIdentityType(projectDetails?.legalRepresentative?.identity?.type)
                                            }</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell variant="head" sx={{ display: 'flex' }}>Số thẻ &nbsp;{isFieldChanged("cardId", true) && <TextFieldChange />}</TableCell>
                                            <TableCell>{projectDetails.legalRepresentative.identity?.cardId}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell variant="head" sx={{ display: 'flex' }}>Mặt trước thẻ &nbsp;{isFieldChanged("frontIdImage", true) && <TextFieldChange />}</TableCell>
                                            <TableCell>{projectDetails.legalRepresentative.frontIdImage && <ImageZoomable imageUrl={projectDetails.legalRepresentative?.frontIdImage} width={150} />}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell variant="head" sx={{ display: 'flex' }}>Mặt sau thẻ &nbsp;{isFieldChanged("backIdImage", true) && <TextFieldChange />}</TableCell>
                                            <TableCell>{projectDetails.legalRepresentative.backIdImage && <ImageZoomable imageUrl={projectDetails?.legalRepresentative?.backIdImage} width={150} />}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        )}
                    </Collapse>
                </Card>
                <Grid item xs={12}>
                    <UpdatePassport projectData={projectDetails} handleSetPassportImage={setPassportImage}> </UpdatePassport>
                </Grid>
                <SubCard>
                    <Grid item xs={12} sx={{ pb: 5 }} >
                        <ModalProfile projectDetails={projectDetails} passportImage={passportImage}> </ModalProfile>
                    </Grid>
                </SubCard>
            </MainCard>
        </>
    );
}
