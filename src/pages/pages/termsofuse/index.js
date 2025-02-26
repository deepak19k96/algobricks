import React from 'react'
import { Box, Typography } from '@mui/material'
import BlankLayout from 'src/@core/layouts/BlankLayout'

const TermsOfUse = () => {
    return (
        <Box
            sx={{
                width: '100vw',
                minHeight: '100vh',
                backgroundImage: 'url(/images/whitebg.jpeg)',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment:'fixed',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                pt: { xs: 4, sm: 8 },
                pb: { xs: 4, sm: 8 },
                px: { xs: 2, sm: 4 }
            }}
        >
            {/* Page Title */}
            <Typography
                variant='h4'
                sx={{
                    fontWeight: 'bold',
                    mb: 3,
                    color: '#054A91',
                    textAlign: 'center',
                    fontSize: { xs: '1.5rem', sm: '1.5rem' }
                }}
            >
                Terms Of Use
            </Typography>
            <Typography
  onClick={() => window.history.back()}
  sx={{
    color: '#054A91',
    fontWeight: 'bold',
    fontSize: '0.9rem',
    mt: 0,
    cursor: 'pointer',
  }}
>
  &lt;&lt; Go Back
</Typography>
            {/* Content Container */}
            <Box
                sx={{
                    maxWidth: '800px',
                    width: '100%',
                    borderRadius: 2,
                    p: { xs: 3, sm: 4 }
                }}
            >


<Box sx={{ mb: 4 }}>
                   
                    <Typography
                        sx={{
                            color: '#000',
                            fontSize: '0.8rem',
                            lineHeight: 1.2,
                            mb: 2,
                            fontWeight: 600,
                            textAlign: 'justify'
                        }}
                    >
                        This web site, together with Young Engineers Student portal (the “Site”) is owned and operated by The Decade Group – Young Engineers Ltd. (“Young Engineers”, “we”, “us” or “our”). The use of this Site and the content and information available on this Site (collectively the “Services”) shall be subject to acceptance of and compliance with the terms and conditions set forth in these terms of use (collectively, the “Terms of Use”) and elsewhere on this Site. The terms “you,” “your”, “yours”, “member” “members” and “yourself” refer to all visitors/members to this Site. Your agreement to comply with and be bound by these Terms of Use is deemed to occur upon your first use of the Site. If you do not agree to these Terms of Use, you should not review information or obtain goods, services or products from this Site. The Sample Store has the total right to edit or delete any content in the Site, including this Agreement, without notifying you.
                    </Typography>
                  
                </Box>

                {/* Section 1 */}
                <Box sx={{ mb: 4 }}>
                    <Typography
                        sx={{
                            color: '#003050',
                            fontWeight: 'bold',
                            fontSize: '1.1rem',
                            mb: 1
                        }}
                    >
                        INTELLECTUAL PROPERTY RIGHTS
                    </Typography>
                    <Typography
                        sx={{
                            color: '#000',
                            fontSize: '0.8rem',
                            lineHeight: 1.2,
                            mb: 2,
                            fontWeight: 600,
                            textAlign: 'justify'
                        }}
                    >
                        All editorial content, information, models, videos, photographs, illustrations,
                        artwork and other graphic materials, and names, logos and trade marks on this
                        Site are protected by copyright laws and/or other laws and/or international
                        treaties, and belong to us and/or our suppliers, as the case may be. These works,
                        logos, graphics, sounds or images may not be copied, reproduced, retransmitted,
                        distributed, disseminated, sold, published, broadcasted or circulated whether in whole
                        or in part, unless expressly permitted by us and/or our suppliers, as the case may be.
                    </Typography>
                    <Typography
                        sx={{
                            color: '#000',
                            fontSize: '0.8rem',
                            lineHeight: 1.2,
                            mt: 2, // adds a one-line gap between paragraphs
                            fontWeight: 600,
                            textAlign: 'justify'
                        }}
                    >
                        Nothing contained on the Site should be construed as granting by implication, estoppel, or otherwise, any license
                        or right to use any trademark displayed on the Site without our written permission. Misuse of any trademarks or any
                        other content displayed on the Site is prohibited.
                    </Typography>
                    <Typography
                        sx={{
                            color: '#000',
                            fontSize: '0.8rem',
                            lineHeight: 1.2,
                            mt: 2, // adds a one-line gap between paragraphs
                            fontWeight: 600,
                            textAlign: 'justify'
                        }}
                    >
                        We will not hesitate to take legal action against any unauthorized usage of its trade marks, name or symbols to preserve and protect its rights in the matter. All rights not expressly granted herein are reserved. Other product and company names mentioned herein may also be the trade marks of their respective owners.
                    </Typography>

                </Box>

                {/* Section 2 */}
                <Box sx={{ mb: 4 }}>
                    <Typography
                        sx={{
                            color: '#003050',
                            fontWeight: 'bold',
                            fontSize: '1.1rem',
                            mb: 1
                        }}
                    >
                        CHANGES TO TERMS OF USE
                    </Typography>
                    <Typography
                        sx={{
                            color: '#000',
                            fontSize: '0.8rem',
                            lineHeight: 1.2,
                            mb: 2,
                            fontWeight: 600,
                            textAlign: 'justify'
                        }}
                    >
                        These Terms of Use may be modified from time to time. Any modifications to these Terms of Use will be effective upon posting. You should therefore read these Terms of Use before you place any order. Your continued use of the Site after any modifications to the Terms of Use indicates your acceptance of the modified Terms of Use
                    </Typography>
                </Box>

                {/* Section 3 */}
                <Box sx={{ mb: 4 }}>
  <Typography
    sx={{
      color: '#003050',
      fontWeight: 'bold',
      fontSize: '1.1rem',
      mb: 1
    }}
  >
    USE OF THIS SITE
  </Typography>
  <Typography
    sx={{
      color: '#000',
      fontSize: '0.8rem',
      lineHeight: 1.2,
      mb: 2,
      fontWeight: 600,
      textAlign: 'justify'
    }}
  >
    You agree not to:-
  </Typography>
  <Box component="ul" sx={{ pl: 2, m: 0,       listStyleType: 'none' // This removes the default bullet points
 }}>
    <li>
      <Typography
        sx={{
          color: '#000',
          fontSize: '0.8rem',
          lineHeight: 1.2,
          mb: 1,
          fontWeight: 600,
          textAlign: 'justify'
        }}
      >
        (a) reproduce, copy, distribute, modify, publish, transmit, display, use, reuse, re-publicize, assign,
        sublicense, sell, or exploit for any public or commercial purpose, any portion of the Site, use of the Site,
        or access to the Site.
      </Typography>
    </li>
    <li>
      <Typography
        sx={{
          color: '#000',
          fontSize: '0.8rem',
          lineHeight: 1.2,
          mb: 1,
          fontWeight: 600,
          textAlign: 'justify'
        }}
      >
        (b) attempt to change, add to, remove, deface, hack or otherwise interfere with this Site or any material or
        content displayed on this Site; and/or
      </Typography>
    </li>
    <li>
      <Typography
        sx={{
          color: '#000',
          fontSize: '0.8rem',
          lineHeight: 1.2,
          mb: 1,
          fontWeight: 600,
          textAlign: 'justify'
        }}
      >
        (c) access or use this Site in any way that could or is intended to damage or impair the Site, or any server or
        network underlying the Site, or interfere with anyone else’s use and enjoyment of the Site.
      </Typography>
    </li>
  </Box>
</Box>


<Box sx={{ mb: 4 }}>
                    <Typography
                        sx={{
                            color: '#003050',
                            fontWeight: 'bold',
                            fontSize: '1.1rem',
                            mb: 1
                        }}
                    >
                        USE OF INFORMATION

                    </Typography>
                    <Typography
                        sx={{
                            color: '#000',
                            fontSize: '0.8rem',
                            lineHeight: 1.2,
                            mb: 2,
                            fontWeight: 600,
                            textAlign: 'justify'
                        }}
                    >
We have a group privacy policy which sets out how we handle personal data that you may provide or that we may collect, in connection with your access or use of this website. The policy is available on this website. You accept and agree to the terms set out in the policy and consent to the collection, use and disclosure of your personal data in accordance with the policy.

</Typography>
                </Box>



                <Box sx={{ mb: 4 }}>
                    <Typography
                        sx={{
                            color: '#003050',
                            fontWeight: 'bold',
                            fontSize: '1.1rem',
                            mb: 1
                        }}
                    >
SUBMISSIONS
                    </Typography>
                    <Typography
                        sx={{
                            color: '#000',
                            fontSize: '0.8rem',
                            lineHeight: 1.2,
                            mb: 2,
                            fontWeight: 600,
                            textAlign: 'justify'
                        }}
                    >
When available, you may post reviews of products or services, comments, suggestions, or other messages (collectively referred to as “Submissions”) so long as the content of your Submission is not unlawful, threatening, abusive, spiteful, defamatory, invasive of privacy, obscene, profane, sexually explicit, fraudulent or otherwise objectionable or injurious to third parties (including, but not limited to, any content that encourages conduct that would constitute a criminal offense, give rise to civil liability, or otherwise violate applicable law). You may not use a false e-mail address, impersonate any person or entity, or otherwise mislead as to the origin of your Submission. The Sample Store reserves the right (but not the obligation) to monitor, edit and remove any Submission. By posting or sending us any Submission, you grant The Sample Store a non-exclusive, perpetual, irrevocable and fully sublicensable right to use, reproduce, modify, adapt, publish, translate, create derivative works from, distribute, and display such Submission in any media.
</Typography>
                </Box>




                <Box sx={{ mb: 4 }}>
                    <Typography
                        sx={{
                            color: '#003050',
                            fontWeight: 'bold',
                            fontSize: '1.1rem',
                            mb: 1
                        }}
                    >
                        PROMOTIONS

                    </Typography>
                    <Typography
                        sx={{
                            color: '#000',
                            fontSize: '0.8rem',
                            lineHeight: 1.2,
                            mb: 2,
                            fontWeight: 600,
                            textAlign: 'justify'
                        }}
                    >
From time to time, we may offer and/or co-sponsor contests and games on the Site. Each of these activities shall be governed by specific rules accessible from the Site.


</Typography>
                </Box>



                <Box sx={{ mb: 4 }}>
  <Typography
    sx={{
      color: '#003050',
      fontWeight: 'bold',
      fontSize: '1.1rem',
      mb: 1
    }}
  >
    DISCLAIMER AND EXCLUSION OF LIABILITY
  </Typography>

  {/* Ordered list with decimal numbering, smaller/bold markers */}
  <Box
    component='ol'
    sx={{
      pl: 2,
      m: 0,
      listStyleType: 'decimal',
      listStylePosition: 'outside',
      '& li::marker': {
        fontSize: '0.8rem',
        fontWeight: 'bold'
      }
    }}
  >
    {/* List Item 1 */}
    <Box component='li' sx={{ mb: 2 }}>
      <Typography
        sx={{
          color: '#000',
          fontSize: '0.8rem',
          lineHeight: 1.2,
          fontWeight: 600,
          textAlign: 'justify'
        }}
      >
        This Site, the Services, the information on this Site and use of all related facilities
        are provided on an "as is, as available" basis without any warranties whether express
        or implied.
      </Typography>
    </Box>

    {/* List Item 2 */}
    <Box component='li' sx={{ mb: 2 }}>
      <Typography
        sx={{
          color: '#000',
          fontSize: '0.8rem',
          lineHeight: 1.2,
          fontWeight: 600,
          textAlign: 'justify'
        }}
      >
        To the fullest extent permitted by applicable law, we disclaim all representations
        and warranties relating to this Site and its contents, including in relation to any
        inaccuracies or omissions in this Site, warranties of merchantability, quality,
        fitness for a particular purpose, accuracy, availability, noninfringement or implied
        warranties from course of dealing or usage of trade.
      </Typography>
    </Box>

    {/* List Item 3 */}
    <Box component='li' sx={{ mb: 2 }}>
      <Typography
        sx={{
          color: '#000',
          fontSize: '0.8rem',
          lineHeight: 1.2,
          fontWeight: 600,
          textAlign: 'justify'
        }}
      >
        We do not warrant that this Site will always be accessible, uninterrupted, timely,
        secure, error free or free from computer virus or other invasive or damaging code or
        that this Site will not be affected by acts of God or other force majeure events,
        including inability to obtain or shortage of necessary materials, equipment facilities,
        power or telecommunications, lack of telecommunication equipment or facilities and
        failure of information technology or telecommunications equipment or facilities.
      </Typography>
    </Box>

    {/* List Item 4 */}
    <Box component='li'>
      <Typography
        sx={{
          color: '#000',
          fontSize: '0.8rem',
          lineHeight: 1.2,
          fontWeight: 600,
          textAlign: 'justify'
        }}
      >
        While we may make all reasonable efforts to include accurate and up-to-date information
        on this Site, we make no warranties or representations as to its accuracy, timeliness
        or completeness. WE SHALL NOT BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
        CONSEQUENTIAL OR PUNITIVE DAMAGES, HOWSOEVER CAUSED, RESULTING FROM THE USE, INABILITY
        TO USE, OR RELIANCE ON OR DOWNLOADING FROM THIS SITE, OR ANY DELAYS, INACCURACIES IN
        THE INFORMATION OR IN ITS TRANSMISSION INCLUDING BUT NOT LIMITED TO DAMAGES FOR
        MISPROPPER USE OF ANY OF THE BUILDING BLOCKS, USE, DATA OR OTHER INTANGIBLE.
      </Typography>
    </Box>
  </Box>
</Box>

{/* Section 1 */}
<Box sx={{ mb: 4 }}>
                    <Typography
                        sx={{
                            color: '#003050',
                            fontWeight: 'bold',
                            fontSize: '1.1rem',
                            mb: 1
                        }}
                    >
                        GOVERNING LAW AND JURISDICTION
                    </Typography>
                    <Typography
                        sx={{
                            color: '#000',
                            fontSize: '0.8rem',
                            lineHeight: 1.2,
                            mb: 2,
                            fontWeight: 600,
                            textAlign: 'justify'
                        }}
                    >
                        This Site may be accessed from all countries around the world where the local technology permits. As each country has differing laws, by accessing this Site both we and you agree that the laws of the State of Israel, without regard to the conflict of laws principles thereof, will apply to all matters relating to these Terms of Use.
                    </Typography>
                    <Typography
                        sx={{
                            color: '#000',
                            fontSize: '0.8rem',
                            lineHeight: 1.2,
                            mt: 2, // adds a one-line gap between paragraphs
                            fontWeight: 600,
                            textAlign: 'justify'
                        }}
                    >
                        You accept and agree to submit to the exclusive jurisdiction of the courts of Tel-Aviv in respect of any dispute or difference arising out of and/or in connection with these Terms of Use
                    </Typography>
                    

                </Box>


            </Box>




            
        </Box>
    )
}

TermsOfUse.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default TermsOfUse
