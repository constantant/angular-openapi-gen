import { InjectionToken, inject, Signal, FactoryProvider } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Validator, type Schema } from '@cfworker/json-schema';
import type { paths } from '../schema.d';
import { YOUTUBE_BASE_URL } from '../api-base-url.token';
import { OAUTH2 } from '../oauth2.security-token';
import { OAUTH2C } from '../oauth2c.security-token';

export type YoutubeVideosInsertBody = Blob | ArrayBuffer;

export type YoutubeVideosInsertResponse =
  paths['/youtube/v3/videos']['post']['responses']['200']['content']['application/json'];

const _responseSchema: Schema = {
  description: 'A *video* resource represents a YouTube video.',
  properties: {
    ageGating: {
      description:
        'Age restriction details related to a video. This data can only be retrieved by the video owner.',
      properties: {
        alcoholContent: {
          description:
            'Indicates whether or not the video has alcoholic beverage content. Only users of legal purchasing age in a particular country, as identified by ICAP, can view the content.',
          type: 'boolean',
        },
        restricted: {
          description:
            "Age-restricted trailers. For redband trailers and adult-rated video-games. Only users aged 18+ can view the content. The the field is true the content is restricted to viewers aged 18+. Otherwise The field won't be present.",
          type: 'boolean',
        },
        videoGameRating: {
          description: 'Video game rating, if any.',
          enum: ['anyone', 'm15Plus', 'm16Plus', 'm17Plus'],
          type: 'string',
        },
      },
      type: 'object',
    },
    contentDetails: {
      description:
        'The contentDetails object contains information about the video content, including the length of the video and its aspect ratio.',
      properties: {
        caption: {
          description:
            'The value of captions indicates whether the video has captions or not.',
          enum: ['true', 'false'],
          type: 'string',
        },
        contentRating: {
          description:
            'Specifies the ratings that the video received under various rating schemes.',
          properties: {
            acbRating: {
              description:
                "The video's Australian Classification Board (ACB) or Australian Communications and Media Authority (ACMA) rating. ACMA ratings are used to classify children's television programming.",
              enum: [
                'acbUnspecified',
                'acbE',
                'acbP',
                'acbC',
                'acbG',
                'acbPg',
                'acbM',
                'acbMa15plus',
                'acbR18plus',
                'acbUnrated',
              ],
              type: 'string',
            },
            agcomRating: {
              description:
                "The video's rating from Italy's Autorità per le Garanzie nelle Comunicazioni (AGCOM).",
              enum: [
                'agcomUnspecified',
                'agcomT',
                'agcomVm14',
                'agcomVm18',
                'agcomUnrated',
              ],
              type: 'string',
            },
            anatelRating: {
              description:
                "The video's Anatel (Asociación Nacional de Televisión) rating for Chilean television.",
              enum: [
                'anatelUnspecified',
                'anatelF',
                'anatelI',
                'anatelI7',
                'anatelI10',
                'anatelI12',
                'anatelR',
                'anatelA',
                'anatelUnrated',
              ],
              type: 'string',
            },
            bbfcRating: {
              description:
                "The video's British Board of Film Classification (BBFC) rating.",
              enum: [
                'bbfcUnspecified',
                'bbfcU',
                'bbfcPg',
                'bbfc12a',
                'bbfc12',
                'bbfc15',
                'bbfc18',
                'bbfcR18',
                'bbfcUnrated',
              ],
              type: 'string',
            },
            bfvcRating: {
              description:
                "The video's rating from Thailand's Board of Film and Video Censors.",
              enum: [
                'bfvcUnspecified',
                'bfvcG',
                'bfvcE',
                'bfvc13',
                'bfvc15',
                'bfvc18',
                'bfvc20',
                'bfvcB',
                'bfvcUnrated',
              ],
              type: 'string',
            },
            bmukkRating: {
              description:
                "The video's rating from the Austrian Board of Media Classification (Bundesministerium für Unterricht, Kunst und Kultur).",
              enum: [
                'bmukkUnspecified',
                'bmukkAa',
                'bmukk6',
                'bmukk8',
                'bmukk10',
                'bmukk12',
                'bmukk14',
                'bmukk16',
                'bmukkUnrated',
              ],
              type: 'string',
            },
            catvRating: {
              description:
                "Rating system for Canadian TV - Canadian TV Classification System The video's rating from the Canadian Radio-Television and Telecommunications Commission (CRTC) for Canadian English-language broadcasts. For more information, see the Canadian Broadcast Standards Council website.",
              enum: [
                'catvUnspecified',
                'catvC',
                'catvC8',
                'catvG',
                'catvPg',
                'catv14plus',
                'catv18plus',
                'catvUnrated',
                'catvE',
              ],
              type: 'string',
            },
            catvfrRating: {
              description:
                "The video's rating from the Canadian Radio-Television and Telecommunications Commission (CRTC) for Canadian French-language broadcasts. For more information, see the Canadian Broadcast Standards Council website.",
              enum: [
                'catvfrUnspecified',
                'catvfrG',
                'catvfr8plus',
                'catvfr13plus',
                'catvfr16plus',
                'catvfr18plus',
                'catvfrUnrated',
                'catvfrE',
              ],
              type: 'string',
            },
            cbfcRating: {
              description:
                "The video's Central Board of Film Certification (CBFC - India) rating.",
              enum: [
                'cbfcUnspecified',
                'cbfcU',
                'cbfcUA',
                'cbfcUA7plus',
                'cbfcUA13plus',
                'cbfcUA16plus',
                'cbfcA',
                'cbfcS',
                'cbfcUnrated',
              ],
              type: 'string',
            },
            cccRating: {
              description:
                "The video's Consejo de Calificación Cinematográfica (Chile) rating.",
              enum: [
                'cccUnspecified',
                'cccTe',
                'ccc6',
                'ccc14',
                'ccc18',
                'ccc18v',
                'ccc18s',
                'cccUnrated',
              ],
              type: 'string',
            },
            cceRating: {
              description:
                "The video's rating from Portugal's Comissão de Classificação de Espect´culos.",
              enum: [
                'cceUnspecified',
                'cceM4',
                'cceM6',
                'cceM12',
                'cceM16',
                'cceM18',
                'cceUnrated',
                'cceM14',
              ],
              type: 'string',
            },
            chfilmRating: {
              description: "The video's rating in Switzerland.",
              enum: [
                'chfilmUnspecified',
                'chfilm0',
                'chfilm6',
                'chfilm12',
                'chfilm16',
                'chfilm18',
                'chfilmUnrated',
              ],
              type: 'string',
            },
            chvrsRating: {
              description:
                "The video's Canadian Home Video Rating System (CHVRS) rating.",
              enum: [
                'chvrsUnspecified',
                'chvrsG',
                'chvrsPg',
                'chvrs14a',
                'chvrs18a',
                'chvrsR',
                'chvrsE',
                'chvrsUnrated',
              ],
              type: 'string',
            },
            cicfRating: {
              description:
                "The video's rating from the Commission de Contrôle des Films (Belgium).",
              enum: [
                'cicfUnspecified',
                'cicfE',
                'cicfKtEa',
                'cicfKntEna',
                'cicfUnrated',
              ],
              type: 'string',
            },
            cnaRating: {
              description:
                "The video's rating from Romania's CONSILIUL NATIONAL AL AUDIOVIZUALULUI (CNA).",
              enum: [
                'cnaUnspecified',
                'cnaAp',
                'cna12',
                'cna15',
                'cna18',
                'cna18plus',
                'cnaUnrated',
              ],
              type: 'string',
            },
            cncRating: {
              description:
                'Rating system in France - Commission de classification cinematographique',
              enum: [
                'cncUnspecified',
                'cncT',
                'cnc10',
                'cnc12',
                'cnc16',
                'cnc18',
                'cncE',
                'cncInterdiction',
                'cncUnrated',
              ],
              type: 'string',
            },
            csaRating: {
              description:
                "The video's rating from France's Conseil supérieur de l’audiovisuel, which rates broadcast content.",
              enum: [
                'csaUnspecified',
                'csaT',
                'csa10',
                'csa12',
                'csa16',
                'csa18',
                'csaInterdiction',
                'csaUnrated',
              ],
              type: 'string',
            },
            cscfRating: {
              description:
                "The video's rating from Luxembourg's Commission de surveillance de la classification des films (CSCF).",
              enum: [
                'cscfUnspecified',
                'cscfAl',
                'cscfA',
                'cscf6',
                'cscf9',
                'cscf12',
                'cscf16',
                'cscf18',
                'cscfUnrated',
              ],
              type: 'string',
            },
            czfilmRating: {
              description: "The video's rating in the Czech Republic.",
              enum: [
                'czfilmUnspecified',
                'czfilmU',
                'czfilm12',
                'czfilm14',
                'czfilm18',
                'czfilmUnrated',
              ],
              type: 'string',
            },
            djctqRating: {
              description:
                "The video's Departamento de Justiça, Classificação, Qualificação e Títulos (DJCQT - Brazil) rating.",
              enum: [
                'djctqUnspecified',
                'djctqL',
                'djctq10',
                'djctq12',
                'djctq14',
                'djctq16',
                'djctq18',
                'djctqEr',
                'djctqL10',
                'djctqL12',
                'djctqL14',
                'djctqL16',
                'djctqL18',
                'djctq1012',
                'djctq1014',
                'djctq1016',
                'djctq1018',
                'djctq1214',
                'djctq1216',
                'djctq1218',
                'djctq1416',
                'djctq1418',
                'djctq1618',
                'djctqUnrated',
              ],
              type: 'string',
            },
            djctqRatingReasons: {
              description:
                'Reasons that explain why the video received its DJCQT (Brazil) rating.',
              items: {
                enum: [
                  'djctqRatingReasonUnspecified',
                  'djctqViolence',
                  'djctqExtremeViolence',
                  'djctqSexualContent',
                  'djctqNudity',
                  'djctqSex',
                  'djctqExplicitSex',
                  'djctqDrugs',
                  'djctqLegalDrugs',
                  'djctqIllegalDrugs',
                  'djctqInappropriateLanguage',
                  'djctqCriminalActs',
                  'djctqImpactingContent',
                ],
                type: 'string',
              },
              type: 'array',
            },
            ecbmctRating: {
              description:
                'Rating system in Turkey - Evaluation and Classification Board of the Ministry of Culture and Tourism',
              enum: [
                'ecbmctUnspecified',
                'ecbmctG',
                'ecbmct7a',
                'ecbmct7plus',
                'ecbmct13a',
                'ecbmct13plus',
                'ecbmct15a',
                'ecbmct15plus',
                'ecbmct18plus',
                'ecbmctUnrated',
              ],
              type: 'string',
            },
            eefilmRating: {
              description: "The video's rating in Estonia.",
              enum: [
                'eefilmUnspecified',
                'eefilmPere',
                'eefilmL',
                'eefilmMs6',
                'eefilmK6',
                'eefilmMs12',
                'eefilmK12',
                'eefilmK14',
                'eefilmK16',
                'eefilmUnrated',
              ],
              type: 'string',
            },
            egfilmRating: {
              description: "The video's rating in Egypt.",
              enum: [
                'egfilmUnspecified',
                'egfilmGn',
                'egfilm18',
                'egfilmBn',
                'egfilmUnrated',
              ],
              type: 'string',
            },
            eirinRating: {
              description:
                "The video's Eirin (映倫) rating. Eirin is the Japanese rating system.",
              enum: [
                'eirinUnspecified',
                'eirinG',
                'eirinPg12',
                'eirinR15plus',
                'eirinR18plus',
                'eirinUnrated',
              ],
              type: 'string',
            },
            fcbmRating: {
              description:
                "The video's rating from Malaysia's Film Censorship Board.",
              enum: [
                'fcbmUnspecified',
                'fcbmU',
                'fcbmPg13',
                'fcbmP13',
                'fcbm18',
                'fcbm18sx',
                'fcbm18pa',
                'fcbm18sg',
                'fcbm18pl',
                'fcbmUnrated',
              ],
              type: 'string',
            },
            fcoRating: {
              description:
                "The video's rating from Hong Kong's Office for Film, Newspaper and Article Administration.",
              enum: [
                'fcoUnspecified',
                'fcoI',
                'fcoIia',
                'fcoIib',
                'fcoIi',
                'fcoIii',
                'fcoUnrated',
              ],
              type: 'string',
            },
            fmocRating: {
              description:
                'This property has been deprecated. Use the contentDetails.contentRating.cncRating instead.',
              enum: [
                'fmocUnspecified',
                'fmocU',
                'fmoc10',
                'fmoc12',
                'fmoc16',
                'fmoc18',
                'fmocE',
                'fmocUnrated',
              ],
              type: 'string',
            },
            fpbRating: {
              description:
                "The video's rating from South Africa's Film and Publication Board.",
              enum: [
                'fpbUnspecified',
                'fpbA',
                'fpbPg',
                'fpb79Pg',
                'fpb1012Pg',
                'fpb13',
                'fpb16',
                'fpb18',
                'fpbX18',
                'fpbXx',
                'fpbUnrated',
                'fpb10',
              ],
              type: 'string',
            },
            fpbRatingReasons: {
              description:
                'Reasons that explain why the video received its FPB (South Africa) rating.',
              items: {
                enum: [
                  'fpbRatingReasonUnspecified',
                  'fpbBlasphemy',
                  'fpbLanguage',
                  'fpbNudity',
                  'fpbPrejudice',
                  'fpbSex',
                  'fpbViolence',
                  'fpbDrugs',
                  'fpbSexualViolence',
                  'fpbHorror',
                  'fpbCriminalTechniques',
                  'fpbImitativeActsTechniques',
                ],
                type: 'string',
              },
              type: 'array',
            },
            fskRating: {
              description:
                "The video's Freiwillige Selbstkontrolle der Filmwirtschaft (FSK - Germany) rating.",
              enum: [
                'fskUnspecified',
                'fsk0',
                'fsk6',
                'fsk12',
                'fsk16',
                'fsk18',
                'fskUnrated',
              ],
              type: 'string',
            },
            grfilmRating: {
              description: "The video's rating in Greece.",
              enum: [
                'grfilmUnspecified',
                'grfilmK',
                'grfilmE',
                'grfilmK12',
                'grfilmK13',
                'grfilmK15',
                'grfilmK17',
                'grfilmK18',
                'grfilmUnrated',
              ],
              type: 'string',
            },
            icaaRating: {
              description:
                "The video's Instituto de la Cinematografía y de las Artes Audiovisuales (ICAA - Spain) rating.",
              enum: [
                'icaaUnspecified',
                'icaaApta',
                'icaa7',
                'icaa12',
                'icaa13',
                'icaa16',
                'icaa18',
                'icaaX',
                'icaaUnrated',
              ],
              type: 'string',
            },
            ifcoRating: {
              description:
                "The video's Irish Film Classification Office (IFCO - Ireland) rating. See the IFCO website for more information.",
              enum: [
                'ifcoUnspecified',
                'ifcoG',
                'ifcoPg',
                'ifco12',
                'ifco12a',
                'ifco15',
                'ifco15a',
                'ifco16',
                'ifco18',
                'ifcoUnrated',
              ],
              type: 'string',
            },
            ilfilmRating: {
              description: "The video's rating in Israel.",
              enum: [
                'ilfilmUnspecified',
                'ilfilmAa',
                'ilfilm12',
                'ilfilm14',
                'ilfilm16',
                'ilfilm18',
                'ilfilmUnrated',
              ],
              type: 'string',
            },
            incaaRating: {
              description:
                "The video's INCAA (Instituto Nacional de Cine y Artes Audiovisuales - Argentina) rating.",
              enum: [
                'incaaUnspecified',
                'incaaAtp',
                'incaaSam13',
                'incaaSam16',
                'incaaSam18',
                'incaaC',
                'incaaUnrated',
              ],
              type: 'string',
            },
            kfcbRating: {
              description:
                "The video's rating from the Kenya Film Classification Board.",
              enum: [
                'kfcbUnspecified',
                'kfcbG',
                'kfcbPg',
                'kfcb16plus',
                'kfcbR',
                'kfcbUnrated',
              ],
              type: 'string',
            },
            kijkwijzerRating: {
              description:
                "The video's NICAM/Kijkwijzer rating from the Nederlands Instituut voor de Classificatie van Audiovisuele Media (Netherlands).",
              enum: [
                'kijkwijzerUnspecified',
                'kijkwijzerAl',
                'kijkwijzer6',
                'kijkwijzer9',
                'kijkwijzer12',
                'kijkwijzer16',
                'kijkwijzer18',
                'kijkwijzerUnrated',
              ],
              type: 'string',
            },
            kmrbRating: {
              description:
                "The video's Korea Media Rating Board (영상물등급위원회) rating. The KMRB rates videos in South Korea.",
              enum: [
                'kmrbUnspecified',
                'kmrbAll',
                'kmrb12plus',
                'kmrb15plus',
                'kmrbTeenr',
                'kmrbR',
                'kmrbUnrated',
              ],
              type: 'string',
            },
            lsfRating: {
              description:
                "The video's rating from Indonesia's Lembaga Sensor Film.",
              enum: [
                'lsfUnspecified',
                'lsfSu',
                'lsfA',
                'lsfBo',
                'lsf13',
                'lsfR',
                'lsf17',
                'lsfD',
                'lsf21',
                'lsfUnrated',
              ],
              type: 'string',
            },
            mccaaRating: {
              description:
                "The video's rating from Malta's Film Age-Classification Board.",
              enum: [
                'mccaaUnspecified',
                'mccaaU',
                'mccaaPg',
                'mccaa12a',
                'mccaa12',
                'mccaa14',
                'mccaa15',
                'mccaa16',
                'mccaa18',
                'mccaaUnrated',
              ],
              type: 'string',
            },
            mccypRating: {
              description:
                "The video's rating from the Danish Film Institute's (Det Danske Filminstitut) Media Council for Children and Young People.",
              enum: [
                'mccypUnspecified',
                'mccypA',
                'mccyp7',
                'mccyp11',
                'mccyp15',
                'mccypUnrated',
              ],
              type: 'string',
            },
            mcstRating: {
              description: "The video's rating system for Vietnam - MCST",
              enum: [
                'mcstUnspecified',
                'mcstP',
                'mcst0',
                'mcstC13',
                'mcstC16',
                'mcst16plus',
                'mcstC18',
                'mcstGPg',
                'mcstUnrated',
              ],
              type: 'string',
            },
            mdaRating: {
              description:
                "The video's rating from Singapore's Media Development Authority (MDA) and, specifically, it's Board of Film Censors (BFC).",
              enum: [
                'mdaUnspecified',
                'mdaG',
                'mdaPg',
                'mdaPg13',
                'mdaNc16',
                'mdaM18',
                'mdaR21',
                'mdaUnrated',
              ],
              type: 'string',
            },
            medietilsynetRating: {
              description:
                "The video's rating from Medietilsynet, the Norwegian Media Authority.",
              enum: [
                'medietilsynetUnspecified',
                'medietilsynetA',
                'medietilsynet6',
                'medietilsynet7',
                'medietilsynet9',
                'medietilsynet11',
                'medietilsynet12',
                'medietilsynet15',
                'medietilsynet18',
                'medietilsynetUnrated',
              ],
              type: 'string',
            },
            mekuRating: {
              description:
                "The video's rating from Finland's Kansallinen Audiovisuaalinen Instituutti (National Audiovisual Institute).",
              enum: [
                'mekuUnspecified',
                'mekuS',
                'meku7',
                'meku12',
                'meku16',
                'meku18',
                'mekuUnrated',
              ],
              type: 'string',
            },
            menaMpaaRating: {
              description:
                'The rating system for MENA countries, a clone of MPAA. It is needed to prevent titles go live w/o additional QC check, since some of them can be inappropriate for the countries at all. See b/33408548 for more details.',
              enum: [
                'menaMpaaUnspecified',
                'menaMpaaG',
                'menaMpaaPg',
                'menaMpaaPg13',
                'menaMpaaR',
                'menaMpaaUnrated',
              ],
              type: 'string',
            },
            mibacRating: {
              description:
                "The video's rating from the Ministero dei Beni e delle Attività Culturali e del Turismo (Italy).",
              enum: [
                'mibacUnspecified',
                'mibacT',
                'mibacVap',
                'mibacVm6',
                'mibacVm12',
                'mibacVm14',
                'mibacVm16',
                'mibacVm18',
                'mibacUnrated',
              ],
              type: 'string',
            },
            mocRating: {
              description:
                "The video's Ministerio de Cultura (Colombia) rating.",
              enum: [
                'mocUnspecified',
                'mocE',
                'mocT',
                'moc7',
                'moc12',
                'moc15',
                'moc18',
                'mocX',
                'mocBanned',
                'mocUnrated',
              ],
              type: 'string',
            },
            moctwRating: {
              description:
                "The video's rating from Taiwan's Ministry of Culture (文化部).",
              enum: [
                'moctwUnspecified',
                'moctwG',
                'moctwP',
                'moctwPg',
                'moctwR',
                'moctwUnrated',
                'moctwR12',
                'moctwR15',
              ],
              type: 'string',
            },
            mpaaRating: {
              description:
                "The video's Motion Picture Association of America (MPAA) rating.",
              enum: [
                'mpaaUnspecified',
                'mpaaG',
                'mpaaPg',
                'mpaaPg13',
                'mpaaR',
                'mpaaNc17',
                'mpaaX',
                'mpaaUnrated',
              ],
              type: 'string',
            },
            mpaatRating: {
              description:
                'The rating system for trailer, DVD, and Ad in the US. See http://movielabs.com/md/ratings/v2.3/html/US_MPAAT_Ratings.html.',
              enum: ['mpaatUnspecified', 'mpaatGb', 'mpaatRb'],
              type: 'string',
            },
            mtrcbRating: {
              description:
                "The video's rating from the Movie and Television Review and Classification Board (Philippines).",
              enum: [
                'mtrcbUnspecified',
                'mtrcbG',
                'mtrcbPg',
                'mtrcbR13',
                'mtrcbR16',
                'mtrcbR18',
                'mtrcbX',
                'mtrcbUnrated',
              ],
              type: 'string',
            },
            nbcRating: {
              description:
                "The video's rating from the Maldives National Bureau of Classification.",
              enum: [
                'nbcUnspecified',
                'nbcG',
                'nbcPg',
                'nbc12plus',
                'nbc15plus',
                'nbc18plus',
                'nbc18plusr',
                'nbcPu',
                'nbcUnrated',
              ],
              type: 'string',
            },
            nbcplRating: {
              description: "The video's rating in Poland.",
              enum: [
                'nbcplUnspecified',
                'nbcplI',
                'nbcplIi',
                'nbcplIii',
                'nbcplIv',
                'nbcpl18plus',
                'nbcplUnrated',
              ],
              type: 'string',
            },
            nfrcRating: {
              description:
                "The video's rating from the Bulgarian National Film Center.",
              enum: [
                'nfrcUnspecified',
                'nfrcA',
                'nfrcB',
                'nfrcC',
                'nfrcD',
                'nfrcX',
                'nfrcUnrated',
              ],
              type: 'string',
            },
            nfvcbRating: {
              description:
                "The video's rating from Nigeria's National Film and Video Censors Board.",
              enum: [
                'nfvcbUnspecified',
                'nfvcbG',
                'nfvcbPg',
                'nfvcb12',
                'nfvcb12a',
                'nfvcb15',
                'nfvcb18',
                'nfvcbRe',
                'nfvcbUnrated',
              ],
              type: 'string',
            },
            nkclvRating: {
              description:
                "The video's rating from the Nacionãlais Kino centrs (National Film Centre of Latvia).",
              enum: [
                'nkclvUnspecified',
                'nkclvU',
                'nkclv7plus',
                'nkclv12plus',
                'nkclv16plus',
                'nkclv18plus',
                'nkclvUnrated',
              ],
              type: 'string',
            },
            nmcRating: {
              description:
                'The National Media Council ratings system for United Arab Emirates.',
              enum: [
                'nmcUnspecified',
                'nmcG',
                'nmcPg',
                'nmcPg13',
                'nmcPg15',
                'nmc15plus',
                'nmc18plus',
                'nmc18tc',
                'nmcUnrated',
              ],
              type: 'string',
            },
            oflcRating: {
              description:
                "The video's Office of Film and Literature Classification (OFLC - New Zealand) rating.",
              enum: [
                'oflcUnspecified',
                'oflcG',
                'oflcPg',
                'oflcM',
                'oflcR13',
                'oflcR15',
                'oflcR16',
                'oflcR18',
                'oflcUnrated',
                'oflcRp13',
                'oflcRp16',
                'oflcRp18',
              ],
              type: 'string',
            },
            pefilmRating: {
              description: "The video's rating in Peru.",
              enum: [
                'pefilmUnspecified',
                'pefilmPt',
                'pefilmPg',
                'pefilm14',
                'pefilm18',
                'pefilmUnrated',
              ],
              type: 'string',
            },
            rcnofRating: {
              description:
                "The video's rating from the Hungarian Nemzeti Filmiroda, the Rating Committee of the National Office of Film.",
              enum: [
                'rcnofUnspecified',
                'rcnofI',
                'rcnofIi',
                'rcnofIii',
                'rcnofIv',
                'rcnofV',
                'rcnofVi',
                'rcnofUnrated',
              ],
              type: 'string',
            },
            resorteviolenciaRating: {
              description: "The video's rating in Venezuela.",
              enum: [
                'resorteviolenciaUnspecified',
                'resorteviolenciaA',
                'resorteviolenciaB',
                'resorteviolenciaC',
                'resorteviolenciaD',
                'resorteviolenciaE',
                'resorteviolenciaUnrated',
              ],
              type: 'string',
            },
            rtcRating: {
              description:
                "The video's General Directorate of Radio, Television and Cinematography (Mexico) rating.",
              enum: [
                'rtcUnspecified',
                'rtcAa',
                'rtcA',
                'rtcB',
                'rtcB15',
                'rtcC',
                'rtcD',
                'rtcUnrated',
              ],
              type: 'string',
            },
            rteRating: {
              description:
                "The video's rating from Ireland's Raidió Teilifís Éireann.",
              enum: [
                'rteUnspecified',
                'rteGa',
                'rteCh',
                'rtePs',
                'rteMa',
                'rteUnrated',
              ],
              type: 'string',
            },
            russiaRating: {
              description:
                "The video's National Film Registry of the Russian Federation (MKRF - Russia) rating.",
              enum: [
                'russiaUnspecified',
                'russia0',
                'russia6',
                'russia12',
                'russia16',
                'russia18',
                'russiaUnrated',
              ],
              type: 'string',
            },
            skfilmRating: {
              description: "The video's rating in Slovakia.",
              enum: [
                'skfilmUnspecified',
                'skfilmG',
                'skfilmP2',
                'skfilmP5',
                'skfilmP8',
                'skfilmUnrated',
              ],
              type: 'string',
            },
            smaisRating: {
              description: "The video's rating in Iceland.",
              enum: [
                'smaisUnspecified',
                'smaisL',
                'smais7',
                'smais12',
                'smais14',
                'smais16',
                'smais18',
                'smaisUnrated',
              ],
              type: 'string',
            },
            smsaRating: {
              description:
                "The video's rating from Statens medieråd (Sweden's National Media Council).",
              enum: [
                'smsaUnspecified',
                'smsaA',
                'smsa7',
                'smsa11',
                'smsa15',
                'smsaUnrated',
              ],
              type: 'string',
            },
            tvpgRating: {
              description: "The video's TV Parental Guidelines (TVPG) rating.",
              enum: [
                'tvpgUnspecified',
                'tvpgY',
                'tvpgY7',
                'tvpgY7Fv',
                'tvpgG',
                'tvpgPg',
                'pg14',
                'tvpgMa',
                'tvpgUnrated',
              ],
              type: 'string',
            },
            ytRating: {
              description:
                'A rating that YouTube uses to identify age-restricted content.',
              enum: ['ytUnspecified', 'ytAgeRestricted'],
              type: 'string',
            },
          },
          type: 'object',
        },
        countryRestriction: {
          description:
            'The countryRestriction object contains information about the countries where a video is (or is not) viewable.',
          properties: {
            allowed: {
              description:
                'The value of allowed indicates whether the access to the policy is allowed or denied by default.',
              type: 'boolean',
            },
            exception: {
              description:
                'A list of region codes that identify countries where the default policy do not apply.',
              items: {
                type: 'string',
              },
              type: 'array',
            },
          },
          type: 'object',
        },
        definition: {
          description:
            'The value of definition indicates whether the video is available in high definition or only in standard definition.',
          enum: ['sd', 'hd'],
          type: 'string',
        },
        dimension: {
          description:
            'The value of dimension indicates whether the video is available in 3D or in 2D.',
          type: 'string',
        },
        duration: {
          description:
            'The length of the video. The tag value is an ISO 8601 duration in the format PT#M#S, in which the letters PT indicate that the value specifies a period of time, and the letters M and S refer to length in minutes and seconds, respectively. The # characters preceding the M and S letters are both integers that specify the number of minutes (or seconds) of the video. For example, a value of PT15M51S indicates that the video is 15 minutes and 51 seconds long.',
          type: 'string',
        },
        hasCustomThumbnail: {
          description:
            'Indicates whether the video uploader has provided a custom thumbnail image for the video. This property is only visible to the video uploader.',
          type: 'boolean',
        },
        licensedContent: {
          description:
            'The value of is_license_content indicates whether the video is licensed content.',
          type: 'boolean',
        },
        projection: {
          description: 'Specifies the projection format of the video.',
          enum: ['rectangular', '360'],
          type: 'string',
        },
        regionRestriction: {
          description:
            'The regionRestriction object contains information about the countries where a video is (or is not) viewable. The object will contain either the contentDetails.regionRestriction.allowed property or the contentDetails.regionRestriction.blocked property.',
          properties: {
            allowed: {
              description:
                'A list of region codes that identify countries where the video is viewable. If this property is present and a country is not listed in its value, then the video is blocked from appearing in that country. If this property is present and contains an empty list, the video is blocked in all countries.',
              items: {
                type: 'string',
              },
              type: 'array',
            },
            blocked: {
              description:
                'A list of region codes that identify countries where the video is blocked. If this property is present and a country is not listed in its value, then the video is viewable in that country. If this property is present and contains an empty list, the video is viewable in all countries.',
              items: {
                type: 'string',
              },
              type: 'array',
            },
          },
          type: 'object',
        },
      },
      type: 'object',
    },
    etag: {
      description: 'Etag of this resource.',
      type: 'string',
    },
    fileDetails: {
      description:
        "The fileDetails object encapsulates information about the video file that was uploaded to YouTube, including the file's resolution, duration, audio and video codecs, stream bitrates, and more. This data can only be retrieved by the video owner.",
      properties: {
        audioStreams: {
          description:
            'A list of audio streams contained in the uploaded video file. Each item in the list contains detailed metadata about an audio stream.',
          items: {
            description: 'Information about an audio stream.',
            properties: {
              bitrateBps: {
                description: "The audio stream's bitrate, in bits per second.",
                format: 'uint64',
                type: 'string',
              },
              channelCount: {
                description:
                  'The number of audio channels that the stream contains.',
                format: 'uint32',
                type: 'integer',
              },
              codec: {
                description: 'The audio codec that the stream uses.',
                type: 'string',
              },
              vendor: {
                description:
                  'A value that uniquely identifies a video vendor. Typically, the value is a four-letter vendor code.',
                type: 'string',
              },
            },
            type: 'object',
          },
          type: 'array',
        },
        bitrateBps: {
          description:
            "The uploaded video file's combined (video and audio) bitrate in bits per second.",
          format: 'uint64',
          type: 'string',
        },
        container: {
          description: "The uploaded video file's container format.",
          type: 'string',
        },
        creationTime: {
          description:
            'The date and time when the uploaded video file was created. The value is specified in ISO 8601 format. Currently, the following ISO 8601 formats are supported: - Date only: YYYY-MM-DD - Naive time: YYYY-MM-DDTHH:MM:SS - Time with timezone: YYYY-MM-DDTHH:MM:SS+HH:MM ',
          type: 'string',
        },
        durationMs: {
          description: 'The length of the uploaded video in milliseconds.',
          format: 'uint64',
          type: 'string',
        },
        fileName: {
          description:
            "The uploaded file's name. This field is present whether a video file or another type of file was uploaded.",
          type: 'string',
        },
        fileSize: {
          description:
            "The uploaded file's size in bytes. This field is present whether a video file or another type of file was uploaded.",
          format: 'uint64',
          type: 'string',
        },
        fileType: {
          description:
            "The uploaded file's type as detected by YouTube's video processing engine. Currently, YouTube only processes video files, but this field is present whether a video file or another type of file was uploaded.",
          enum: [
            'video',
            'audio',
            'image',
            'archive',
            'document',
            'project',
            'other',
          ],
          type: 'string',
        },
        videoStreams: {
          description:
            'A list of video streams contained in the uploaded video file. Each item in the list contains detailed metadata about a video stream.',
          items: {
            description: 'Information about a video stream.',
            properties: {
              aspectRatio: {
                description:
                  "The video content's display aspect ratio, which specifies the aspect ratio in which the video should be displayed.",
                format: 'double',
                type: 'number',
              },
              bitrateBps: {
                description: "The video stream's bitrate, in bits per second.",
                format: 'uint64',
                type: 'string',
              },
              codec: {
                description: 'The video codec that the stream uses.',
                type: 'string',
              },
              frameRateFps: {
                description:
                  "The video stream's frame rate, in frames per second.",
                format: 'double',
                type: 'number',
              },
              heightPixels: {
                description: "The encoded video content's height in pixels.",
                format: 'uint32',
                type: 'integer',
              },
              rotation: {
                description:
                  'The amount that YouTube needs to rotate the original source content to properly display the video.',
                enum: [
                  'none',
                  'clockwise',
                  'upsideDown',
                  'counterClockwise',
                  'other',
                ],
                type: 'string',
              },
              vendor: {
                description:
                  'A value that uniquely identifies a video vendor. Typically, the value is a four-letter vendor code.',
                type: 'string',
              },
              widthPixels: {
                description:
                  "The encoded video content's width in pixels. You can calculate the video's encoding aspect ratio as width_pixels / height_pixels.",
                format: 'uint32',
                type: 'integer',
              },
            },
            type: 'object',
          },
          type: 'array',
        },
      },
      type: 'object',
    },
    id: {
      description: 'The ID that YouTube uses to uniquely identify the video.',
      type: 'string',
    },
    kind: {
      default: 'youtube#video',
      description:
        'Identifies what kind of resource this is. Value: the fixed string "youtube#video".',
      type: 'string',
    },
    liveStreamingDetails: {
      description:
        'The liveStreamingDetails object contains metadata about a live video broadcast. The object will only be present in a video resource if the video is an upcoming, live, or completed live broadcast.',
      properties: {
        activeLiveChatId: {
          description:
            'The ID of the currently active live chat attached to this video. This field is filled only if the video is a currently live broadcast that has live chat. Once the broadcast transitions to complete this field will be removed and the live chat closed down. For persistent broadcasts that live chat id will no longer be tied to this video but rather to the new video being displayed at the persistent page.',
          type: 'string',
        },
        actualEndTime: {
          description:
            'The time that the broadcast actually ended. This value will not be available until the broadcast is over.',
          format: 'date-time',
          type: 'string',
        },
        actualStartTime: {
          description:
            'The time that the broadcast actually started. This value will not be available until the broadcast begins.',
          format: 'date-time',
          type: 'string',
        },
        concurrentViewers: {
          description:
            'The number of viewers currently watching the broadcast. The property and its value will be present if the broadcast has current viewers and the broadcast owner has not hidden the viewcount for the video. Note that YouTube stops tracking the number of concurrent viewers for a broadcast when the broadcast ends. So, this property would not identify the number of viewers watching an archived video of a live broadcast that already ended.',
          format: 'uint64',
          type: 'string',
        },
        scheduledEndTime: {
          description:
            'The time that the broadcast is scheduled to end. If the value is empty or the property is not present, then the broadcast is scheduled to contiue indefinitely.',
          format: 'date-time',
          type: 'string',
        },
        scheduledStartTime: {
          description: 'The time that the broadcast is scheduled to begin.',
          format: 'date-time',
          type: 'string',
        },
      },
      type: 'object',
    },
    localizations: {
      additionalProperties: {
        description:
          'Localized versions of certain video properties (e.g. title).',
        properties: {
          description: {
            description: "Localized version of the video's description.",
            type: 'string',
          },
          title: {
            description: "Localized version of the video's title.",
            type: 'string',
          },
        },
        type: 'object',
      },
      description:
        'The localizations object contains localized versions of the basic details about the video, such as its title and description.',
      type: 'object',
    },
    monetizationDetails: {
      description:
        'The monetizationDetails object encapsulates information about the monetization status of the video.',
      properties: {
        access: {
          description:
            'The value of access indicates whether the video can be monetized or not.',
          properties: {
            allowed: {
              description:
                'The value of allowed indicates whether the access to the policy is allowed or denied by default.',
              type: 'boolean',
            },
            exception: {
              description:
                'A list of region codes that identify countries where the default policy do not apply.',
              items: {
                type: 'string',
              },
              type: 'array',
            },
          },
          type: 'object',
        },
      },
      type: 'object',
    },
    player: {
      description:
        'The player object contains information that you would use to play the video in an embedded player.',
      properties: {
        embedHeight: {
          format: 'int64',
          type: 'string',
        },
        embedHtml: {
          description:
            'An <iframe> tag that embeds a player that will play the video.',
          type: 'string',
        },
        embedWidth: {
          description: 'The embed width',
          format: 'int64',
          type: 'string',
        },
      },
      type: 'object',
    },
    processingDetails: {
      description:
        "The processingDetails object encapsulates information about YouTube's progress in processing the uploaded video file. The properties in the object identify the current processing status and an estimate of the time remaining until YouTube finishes processing the video. This part also indicates whether different types of data or content, such as file details or thumbnail images, are available for the video. The processingProgress object is designed to be polled so that the video uploaded can track the progress that YouTube has made in processing the uploaded video file. This data can only be retrieved by the video owner.",
      properties: {
        editorSuggestionsAvailability: {
          description:
            'This value indicates whether video editing suggestions, which might improve video quality or the playback experience, are available for the video. You can retrieve these suggestions by requesting the suggestions part in your videos.list() request.',
          type: 'string',
        },
        fileDetailsAvailability: {
          description:
            "This value indicates whether file details are available for the uploaded video. You can retrieve a video's file details by requesting the fileDetails part in your videos.list() request.",
          type: 'string',
        },
        processingFailureReason: {
          description:
            "The reason that YouTube failed to process the video. This property will only have a value if the processingStatus property's value is failed.",
          enum: ['uploadFailed', 'transcodeFailed', 'streamingFailed', 'other'],
          type: 'string',
        },
        processingIssuesAvailability: {
          description:
            "This value indicates whether the video processing engine has generated suggestions that might improve YouTube's ability to process the the video, warnings that explain video processing problems, or errors that cause video processing problems. You can retrieve these suggestions by requesting the suggestions part in your videos.list() request.",
          type: 'string',
        },
        processingProgress: {
          description:
            "The processingProgress object contains information about the progress YouTube has made in processing the video. The values are really only relevant if the video's processing status is processing.",
          properties: {
            partsProcessed: {
              description:
                'The number of parts of the video that YouTube has already processed. You can estimate the percentage of the video that YouTube has already processed by calculating: 100 * parts_processed / parts_total Note that since the estimated number of parts could increase without a corresponding increase in the number of parts that have already been processed, it is possible that the calculated progress could periodically decrease while YouTube processes a video.',
              format: 'uint64',
              type: 'string',
            },
            partsTotal: {
              description:
                'An estimate of the total number of parts that need to be processed for the video. The number may be updated with more precise estimates while YouTube processes the video.',
              format: 'uint64',
              type: 'string',
            },
            timeLeftMs: {
              description:
                'An estimate of the amount of time, in millseconds, that YouTube needs to finish processing the video.',
              format: 'uint64',
              type: 'string',
            },
          },
          type: 'object',
        },
        processingStatus: {
          description:
            "The video's processing status. This value indicates whether YouTube was able to process the video or if the video is still being processed.",
          enum: ['processing', 'succeeded', 'failed', 'terminated'],
          type: 'string',
        },
        tagSuggestionsAvailability: {
          description:
            "This value indicates whether keyword (tag) suggestions are available for the video. Tags can be added to a video's metadata to make it easier for other users to find the video. You can retrieve these suggestions by requesting the suggestions part in your videos.list() request.",
          type: 'string',
        },
        thumbnailsAvailability: {
          description:
            'This value indicates whether thumbnail images have been generated for the video.',
          type: 'string',
        },
      },
      type: 'object',
    },
    projectDetails: {
      description:
        'The projectDetails object contains information about the project specific video metadata. b/157517979: This part was never populated after it was added. However, it sees non-zero traffic because there is generated client code in the wild that refers to it [1]. We keep this field and do NOT remove it because otherwise V3 would return an error when this part gets requested [2]. [1] https://developers.google.com/resources/api-libraries/documentation/youtube/v3/csharp/latest/classGoogle_1_1Apis_1_1YouTube_1_1v3_1_1Data_1_1VideoProjectDetails.html [2] http://google3/video/youtube/src/python/servers/data_api/common.py?l=1565-1569&rcl=344141677',
      properties: {},
      type: 'object',
    },
    recordingDetails: {
      description:
        'The recordingDetails object encapsulates information about the location, date and address where the video was recorded.',
      properties: {
        location: {
          description: 'The geolocation information associated with the video.',
          properties: {
            altitude: {
              description: 'Altitude above the reference ellipsoid, in meters.',
              format: 'double',
              type: 'number',
            },
            latitude: {
              description: 'Latitude in degrees.',
              format: 'double',
              type: 'number',
            },
            longitude: {
              description: 'Longitude in degrees.',
              format: 'double',
              type: 'number',
            },
          },
          type: 'object',
        },
        locationDescription: {
          description:
            'The text description of the location where the video was recorded.',
          type: 'string',
        },
        recordingDate: {
          description: 'The date and time when the video was recorded.',
          format: 'date-time',
          type: 'string',
        },
      },
      type: 'object',
    },
    snippet: {
      description:
        'The snippet object contains basic details about the video, such as its title, description, and category.',
      properties: {
        categoryId: {
          description: 'The YouTube video category associated with the video.',
          type: 'string',
        },
        channelId: {
          description:
            'The ID that YouTube uses to uniquely identify the channel that the video was uploaded to.',
          type: 'string',
        },
        channelTitle: {
          description:
            'Channel title for the channel that the video belongs to.',
          type: 'string',
        },
        defaultAudioLanguage: {
          description:
            "The default_audio_language property specifies the language spoken in the video's default audio track.",
          type: 'string',
        },
        defaultLanguage: {
          description: "The language of the videos's default snippet.",
          type: 'string',
        },
        description: {
          description:
            "The video's description. @mutable youtube.videos.insert youtube.videos.update",
          type: 'string',
        },
        liveBroadcastContent: {
          description:
            'Indicates if the video is an upcoming/active live broadcast. Or it\'s "none" if the video is not an upcoming/active live broadcast.',
          enum: ['none', 'upcoming', 'live', 'completed'],
          type: 'string',
        },
        localized: {
          description:
            'Localized versions of certain video properties (e.g. title).',
          properties: {
            description: {
              description: "Localized version of the video's description.",
              type: 'string',
            },
            title: {
              description: "Localized version of the video's title.",
              type: 'string',
            },
          },
          type: 'object',
        },
        publishedAt: {
          description: 'The date and time when the video was uploaded.',
          format: 'date-time',
          type: 'string',
        },
        tags: {
          description:
            'A list of keyword tags associated with the video. Tags may contain spaces.',
          items: {
            type: 'string',
          },
          type: 'array',
        },
        thumbnails: {
          description:
            'Internal representation of thumbnails for a YouTube resource.',
          properties: {
            high: {
              description: 'The high quality image for this resource.',
              properties: {
                height: {
                  description: '(Optional) Height of the thumbnail image.',
                  format: 'uint32',
                  type: 'integer',
                },
                url: {
                  description: "The thumbnail image's URL.",
                  type: 'string',
                },
                width: {
                  description: '(Optional) Width of the thumbnail image.',
                  format: 'uint32',
                  type: 'integer',
                },
              },
              type: 'object',
            },
            maxres: {
              description:
                'The maximum resolution quality image for this resource.',
              properties: {
                height: {
                  description: '(Optional) Height of the thumbnail image.',
                  format: 'uint32',
                  type: 'integer',
                },
                url: {
                  description: "The thumbnail image's URL.",
                  type: 'string',
                },
                width: {
                  description: '(Optional) Width of the thumbnail image.',
                  format: 'uint32',
                  type: 'integer',
                },
              },
              type: 'object',
            },
            medium: {
              description: 'The medium quality image for this resource.',
              properties: {
                height: {
                  description: '(Optional) Height of the thumbnail image.',
                  format: 'uint32',
                  type: 'integer',
                },
                url: {
                  description: "The thumbnail image's URL.",
                  type: 'string',
                },
                width: {
                  description: '(Optional) Width of the thumbnail image.',
                  format: 'uint32',
                  type: 'integer',
                },
              },
              type: 'object',
            },
            standard: {
              description: 'The standard quality image for this resource.',
              properties: {
                height: {
                  description: '(Optional) Height of the thumbnail image.',
                  format: 'uint32',
                  type: 'integer',
                },
                url: {
                  description: "The thumbnail image's URL.",
                  type: 'string',
                },
                width: {
                  description: '(Optional) Width of the thumbnail image.',
                  format: 'uint32',
                  type: 'integer',
                },
              },
              type: 'object',
            },
          },
          type: 'object',
        },
        title: {
          description:
            "The video's title. @mutable youtube.videos.insert youtube.videos.update",
          type: 'string',
        },
      },
      type: 'object',
    },
    statistics: {
      description: 'The statistics object contains statistics about the video.',
      properties: {
        commentCount: {
          description: 'The number of comments for the video.',
          format: 'uint64',
          type: 'string',
        },
        dislikeCount: {
          description:
            'The number of users who have indicated that they disliked the video by giving it a negative rating.',
          format: 'uint64',
          type: 'string',
        },
        favoriteCount: {
          description:
            'The number of users who currently have the video marked as a favorite video.',
          format: 'uint64',
          type: 'string',
        },
        likeCount: {
          description:
            'The number of users who have indicated that they liked the video by giving it a positive rating.',
          format: 'uint64',
          type: 'string',
        },
        viewCount: {
          description: 'The number of times the video has been viewed.',
          format: 'uint64',
          type: 'string',
        },
      },
      type: 'object',
    },
    status: {
      description:
        "The status object contains information about the video's uploading, processing, and privacy statuses.",
      properties: {
        embeddable: {
          description:
            'This value indicates if the video can be embedded on another website. @mutable youtube.videos.insert youtube.videos.update',
          type: 'boolean',
        },
        failureReason: {
          description:
            'This value explains why a video failed to upload. This property is only present if the uploadStatus property indicates that the upload failed.',
          enum: [
            'conversion',
            'invalidFile',
            'emptyFile',
            'tooSmall',
            'codec',
            'uploadAborted',
          ],
          type: 'string',
        },
        license: {
          description:
            "The video's license. @mutable youtube.videos.insert youtube.videos.update",
          enum: ['youtube', 'creativeCommon'],
          type: 'string',
        },
        madeForKids: {
          type: 'boolean',
        },
        privacyStatus: {
          description: "The video's privacy status.",
          enum: ['public', 'unlisted', 'private'],
          type: 'string',
        },
        publicStatsViewable: {
          description:
            'This value indicates if the extended video statistics on the watch page can be viewed by everyone. Note that the view count, likes, etc will still be visible if this is disabled. @mutable youtube.videos.insert youtube.videos.update',
          type: 'boolean',
        },
        publishAt: {
          description:
            'The date and time when the video is scheduled to publish. It can be set only if the privacy status of the video is private..',
          format: 'date-time',
          type: 'string',
        },
        rejectionReason: {
          description:
            'This value explains why YouTube rejected an uploaded video. This property is only present if the uploadStatus property indicates that the upload was rejected.',
          enum: [
            'copyright',
            'inappropriate',
            'duplicate',
            'termsOfUse',
            'uploaderAccountSuspended',
            'length',
            'claim',
            'uploaderAccountClosed',
            'trademark',
            'legal',
          ],
          type: 'string',
        },
        selfDeclaredMadeForKids: {
          type: 'boolean',
        },
        uploadStatus: {
          description: 'The status of the uploaded video.',
          enum: ['uploaded', 'processed', 'failed', 'rejected', 'deleted'],
          type: 'string',
        },
      },
      type: 'object',
    },
    suggestions: {
      description:
        'The suggestions object encapsulates suggestions that identify opportunities to improve the video quality or the metadata for the uploaded video. This data can only be retrieved by the video owner.',
      properties: {
        editorSuggestions: {
          description:
            'A list of video editing operations that might improve the video quality or playback experience of the uploaded video.',
          items: {
            enum: [
              'videoAutoLevels',
              'videoStabilize',
              'videoCrop',
              'audioQuietAudioSwap',
            ],
            type: 'string',
          },
          type: 'array',
        },
        processingErrors: {
          description:
            "A list of errors that will prevent YouTube from successfully processing the uploaded video video. These errors indicate that, regardless of the video's current processing status, eventually, that status will almost certainly be failed.",
          items: {
            enum: [
              'audioFile',
              'imageFile',
              'projectFile',
              'notAVideoFile',
              'docFile',
              'archiveFile',
              'unsupportedSpatialAudioLayout',
            ],
            type: 'string',
          },
          type: 'array',
        },
        processingHints: {
          description:
            "A list of suggestions that may improve YouTube's ability to process the video.",
          items: {
            enum: [
              'nonStreamableMov',
              'sendBestQualityVideo',
              'sphericalVideo',
              'spatialAudio',
              'vrVideo',
              'hdrVideo',
            ],
            type: 'string',
          },
          type: 'array',
        },
        processingWarnings: {
          description:
            'A list of reasons why YouTube may have difficulty transcoding the uploaded video or that might result in an erroneous transcoding. These warnings are generated before YouTube actually processes the uploaded video file. In addition, they identify issues that are unlikely to cause the video processing to fail but that might cause problems such as sync issues, video artifacts, or a missing audio track.',
          items: {
            enum: [
              'unknownContainer',
              'unknownVideoCodec',
              'unknownAudioCodec',
              'inconsistentResolution',
              'hasEditlist',
              'problematicVideoCodec',
              'problematicAudioCodec',
              'unsupportedVrStereoMode',
              'unsupportedSphericalProjectionType',
              'unsupportedHdrPixelFormat',
              'unsupportedHdrColorMetadata',
              'problematicHdrLookupTable',
            ],
            type: 'string',
          },
          type: 'array',
        },
        tagSuggestions: {
          description:
            "A list of keyword tags that could be added to the video's metadata to increase the likelihood that users will locate your video when searching or browsing on YouTube.",
          items: {
            description:
              "A single tag suggestion with it's relevance information.",
            properties: {
              categoryRestricts: {
                description:
                  'A set of video categories for which the tag is relevant. You can use this information to display appropriate tag suggestions based on the video category that the video uploader associates with the video. By default, tag suggestions are relevant for all categories if there are no restricts defined for the keyword.',
                items: {
                  type: 'string',
                },
                type: 'array',
              },
              tag: {
                description: 'The keyword tag suggested for the video.',
                type: 'string',
              },
            },
            type: 'object',
          },
          type: 'array',
        },
      },
      type: 'object',
    },
    topicDetails: {
      description:
        'The topicDetails object encapsulates information about Freebase topics associated with the video.',
      properties: {
        relevantTopicIds: {
          description:
            'Similar to topic_id, except that these topics are merely relevant to the video. These are topics that may be mentioned in, or appear in the video. You can retrieve information about each topic using Freebase Topic API.',
          items: {
            type: 'string',
          },
          type: 'array',
        },
        topicCategories: {
          description:
            "A list of Wikipedia URLs that provide a high-level description of the video's content.",
          items: {
            type: 'string',
          },
          type: 'array',
        },
        topicIds: {
          description:
            'A list of Freebase topic IDs that are centrally associated with the video. These are topics that are centrally featured in the video, and it can be said that the video is mainly about each of these. You can retrieve information about each topic using the < a href="http://wiki.freebase.com/wiki/Topic_API">Freebase Topic API.',
          items: {
            type: 'string',
          },
          type: 'array',
        },
      },
      type: 'object',
    },
  },
  type: 'object',
};

function _validateResponse(value: unknown): YoutubeVideosInsertResponse {
  const _result = new Validator(_responseSchema).validate(value);
  if (!_result.valid) {
    throw new Error(
      `YoutubeVideosInsert response failed schema validation: ${JSON.stringify(_result.errors)}`,
    );
  }
  return value as YoutubeVideosInsertResponse;
}

export const YOUTUBE_VIDEOS_INSERT = new InjectionToken<
  (
    body: YoutubeVideosInsertBody | Signal<YoutubeVideosInsertBody>,
  ) => ReturnType<typeof httpResource<YoutubeVideosInsertResponse>>
>('YOUTUBE_VIDEOS_INSERT');

export function provideYoutubeVideosInsert(): FactoryProvider {
  return {
    provide: YOUTUBE_VIDEOS_INSERT,
    useFactory: () => {
      const base = inject(YOUTUBE_BASE_URL);
      const oauth2 = inject(OAUTH2, { optional: true });
      const oauth2c = inject(OAUTH2C, { optional: true });
      return (
        body: YoutubeVideosInsertBody | Signal<YoutubeVideosInsertBody>,
      ) =>
        httpResource<YoutubeVideosInsertResponse>(
          () => ({
            url: `${base}/youtube/v3/videos`,
            method: 'POST',
            body,
            headers: {
              ...(oauth2?.() != null
                ? { Authorization: `Bearer ${oauth2()}` }
                : {}),
              ...(oauth2c?.() != null
                ? { Authorization: `Bearer ${oauth2c()}` }
                : {}),
            },
          }),
          { parse: _validateResponse },
        );
    },
  };
}
