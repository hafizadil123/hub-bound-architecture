import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import Header from "../components/header";
const Login = () => {
  const history = useHistory();

  useEffect(() => {}, []);

  return (
    <>
      <Header highlightedItem={""} />
      <div className="content mobile page-terms">
        <div className="container">
          <h4 className="text-success mt-5 font-family">
            MERCHANT AND TERMS OF USE AGREEMENT
          </h4>
          <div className="card">
            <div className="card-body">
              <div className="row">
                <p className="col-md-12">
                  BY ACCEPTING THIS AGREEMENT, BY (1) CLICKING A BOX INDICATING
                  ACCEPTANCE, (2) CREATING AN ACCOUNT, USER AGREES TO THE TERMS
                  OF THIS AGREEMENT.
                </p>
              </div>
              <div className="row">
                <p className="col-md-12">
                  IF THE INDIVIDUAL ACCEPTING THIS AGREEMENT IS ACCEPTING ON
                  BEHALF OF A COMPANY OR OTHER LEGAL ENTITY, SUCH INDIVIDUAL
                  REPRESENTS THAT THEY HAVE THE AUTHORITY TO BIND SUCH ENTITY
                  AND ITS AFFILIATES TO THESE TERMS, IN WHICH CASE THE TERM
                  “USER” SHALL REFER TO SUCH ENTITY AND ITS AFFILIATES. IF THE
                  INDIVIDUAL ACCEPTING THIS AGREEMENT DOES NOT HAVE SUCH
                  AUTHORITY, OR DOES NOT AGREE WITH THESE TERMS AND CONDITIONS,
                  SUCH INDIVIDUAL MUST NOT ACCEPT THIS AGREEMENT AND MAY NOT USE
                  THE SERVICES.
                </p>
              </div>
              <div className="row">
                <p className="col-md-12">
                  IMPORTANT: PLEASE REVIEW THE “DISPUTE RESOLUTION” SECTION SET
                  FORTH BELOW CAREFULLY, AS IT WILL REQUIRE YOU TO ACKNOWLEDGE
                  AND AGREE THAT YOU WAIVE YOUR RIGHT TO PARTICIPATE AS A
                  PLAINTIFF OR CLASS MEMBER IN ANY PURPORTED CLASS ACTION OR
                  REPRESENTATIVE PROCEEDING AGAINST COMPANY. BY ENTERING THIS
                  USER AGREEMENT, YOU EXPRESSLY ACKNOWLEDGE THAT YOU HAVE READ
                  AND UNDERSTOOD, AND AGREE TO BE BOUND BY, ALL OF THE TERMS AND
                  CONDITIONS OF THIS USER AGREEMENT AND HAVE TAKEN TIME TO
                  CONSIDER THE CONSEQUENCES OF THIS IMPORTANT DECISION.
                </p>
              </div>
              <div className="row">
                <h4>1. PURPOSE OF USER AGREEMENT</h4>
                <p className="col-md-12">
                  Produce Locator Inc. (“Company", “Platform”, “we”, “our”, or
                  “us”) owns and operates a certain platform, which includes
                  related subdomains or our mobile, tablet and other smart
                  device applications (collectively, the “Platform”) and Company
                  Services (as defined below).
                </p>
                <p className="col-md-12">
                  These Merchant And Terms Of Use Agreement (“Terms” or
                  “Agreement”) are hereby accepted and agreed to by the company
                  identified within the Platform sign-up process (“User” or
                  “You”), and constitute a legally binding agreement by and
                  between Company. The Parties acknowledge and agree that this
                  Agreement is a licensing agreement between independent
                  businesses that are separately owned and operated. The Parties
                  intend this Agreement to create the relationship of principal
                  and independent contractor and not that of employer and
                  employee. Neither Party shall have the right to bind the other
                  by contract (or otherwise) except as specifically provided in
                  this Agreement.
                </p>
                <p className="col-md-12">
                  Company reserves the right, at any time, to modify or
                  supplement external documents referenced and incorporated into
                  this Agreement and/or any information referenced via hyperlink
                  (or the addresses where such information may be found). Such
                  modifications shall become effective upon posting. Such
                  modifications or supplements may be provided to You via
                  electronic means.
                </p>
              </div>
              <div className="row">
                <h4>2. COMPANY SERVICES</h4>
                <p className="col-md-12">
                  Company makes available certain proprietary technology
                  services which includes but is not limited to enabling User to
                  view and manage orders from various Third Party Partners (as
                  defined below), view performance data, and manage business
                  information including catalog items (“Company Services”).
                </p>
                <p className="col-md-12">
                  User may request access to Company Services. By electing to
                  use the Platform, User agrees that:
                </p>
                <ul className="col-md-12 indendeed">
                  <li>
                    User may sell catalog items (“Goods”) managed via User’s
                    account dashboard, whereby Goods will post on select Third
                    Party Partners. All Goods must be up to date with current
                    stock availability, price, photos, item name, units, brand
                    name, and category.
                  </li>
                  <li>
                    User must provide Customers with real time, up to date hours
                    of operation, location, and Goods of User (“Business
                    Information”). If Business Information is not kept up to
                    date, Company is not liable for consequential mishaps
                    including but not limited to (i) Customer unsatisfaction,
                    (ii) impacts on Third Party Partner relationships, (iii)
                    Goods ordered with incorrect information or at times User is
                    unavailable, (iv) and pickup locations not being clear for
                    orders placed for pickup or delivery.
                  </li>
                  <li>
                    Billing information will be kept up to date and all invoices
                    will be paid within three business days.{" "}
                  </li>
                </ul>
              </div>
              <div className="row">
                <h4>3. THIRD PARTY PARTNERS</h4>
                <p className="col-md-12">
                  Third Party Partner services and products are separate from
                  Company. Third Party Partners’ Terms of Use and/or Agreements
                  are distinct from Company that User may be asked to agree to
                  when initiating or continuing a relationship with Third Party
                  Partners. Company will not provide any services outside of its
                  Company Services scope including but not limited to a courier
                  service, selling marketplace, point of sale service, in-store
                  shopper service, and website builder products. Company
                  provides technology services that enable User to connect to
                  Third Party Partners listed and defined below which do offer
                  these services and products. Notwithstanding, Company has no
                  obligation to connect User to all types of Third Party
                  Partners and has no control over whether User is accepted as a
                  customer with a Third Part Partner.
                </p>
                <p className="indendeed">
                  <b>3.1 eCommerce Ordering Marketplaces.</b> This Third Party
                  Partner serves as an online customer facing outlet for User to
                  sell their Goods on where Customers can directly place orders
                  with User via User’s online listing with the Third Party
                  Partner.
                </p>
                <p className="indendeed">
                  <b>3.2 Courier Services.</b> This Third Party Partner supplies
                  couriers to complete deliveries between the User’s location
                  and Customers that have placed a delivery order with User.
                </p>
                <p className="indendeed">
                  <b>3.3 In-store Shoppers Services.</b> This Third Party
                  Partner supplies in-store shoppers to shop and pack delivery
                  or pickup orders placed by Customers with User.
                </p>
                <p className="indendeed">
                  <b>3.4 Point Of Sale Products.</b> This Third Party Partner’s
                  product primarily serves as a cash register assisting User in
                  placing orders and accepting payments.
                </p>
                <p className="indendeed">
                  <b>3.5 Website Builders.</b> This Third Party Partner enables
                  User to create a personalized website utilizing templates with
                  customization and/or drag and drop no-code solutions.
                </p>
              </div>
              <div className="row">
                <h4>4. COMPANY OBLIGATIONS</h4>
                <p className="col-md-12">
                  Subject to the terms and conditions of this Agreement, Company
                  will make available the applicable Company Services to User,
                  solely for use by User at locations that are owned and
                  operated by User (each, a “Location”). User shall provide
                  Company current and accurate Location information throughout
                  the Term of this Agreement. For the avoidance of doubt, as
                  between User and Company, Company will retain sole and
                  absolute control over the Company Services (and all elements
                  of the user experience and user interface relating to the
                  Company Services), including with respect to: (i) the
                  personalization of the Company Services for User; (ii) the
                  prioritization and display of options 3 available to User; and
                  (iii) adding, removing, or otherwise modifying any feature or
                  functionality made available through the Company Services.
                </p>
              </div>
              <div className="row">
                <h4>5. USER OBLIGATIONS</h4>
                <p className="col-md-12 indendeed">
                  <b>5.1 Legality and Safety of Goods Sold.</b> User will
                  prepare, handle, store, label and package all Goods in
                  accordance with applicable laws and regulations, including
                  without limitation all laws, rules and regulations governing
                  food safety (“Food Safety Standards”) including time and
                  temperature procedures. User will determine any quality,
                  portion, size, ingredient or other criteria that apply to
                  Goods (“Criteria”) and User is responsible for ensuring that
                  all Goods meet the applicable Criteria. If User fails to
                  prepare or supply Goods in accordance with Food Safety
                  Standards or if any Good fails to meet the Criteria (each, a
                  “Substandard Item”), Company is not reliable
                </p>
                <p className="col-md-12 indendeed">
                  <b>5.2 Use Restrictions.</b> In connection with the access to
                  and use of the Company Services, User will not (and will not
                  allow any third party to): (i) reverse engineer or attempt to
                  discover any source code or underlying ideas or algorithms
                  used to provide the Company Services (except to the extent
                  applicable law prohibits reverse engineering restrictions);
                  (ii) provide, lease, lend, disclose, or otherwise use or allow
                  others to use, in each case, for the direct benefit of any
                  third party, the Company Services (except as otherwise
                  authorized by Company); or (iii) possess or use, or allow the
                  transfer, transmission, export, or re-export of any software
                  or portion thereof in violation of any export control laws or
                  regulations administered by the U.S. Commerce Department, U.S.
                  Treasury Department's Office of Foreign Assets Control, or any
                  other government agency. User will not (and will not allow any
                  third party to) use the Company Services or any other
                  transactional, operational, performance or other data or
                  information to directly or indirectly compete with Company.
                </p>
              </div>
              <div className="row">
                <h4>6. DATA</h4>
                <p className="col-md-12">
                  Company may collect data from User in relation to Company
                  Services. This includes but is not limited to third party
                  registration and login options such as Meta and/or Google for
                  the purpose of prefilling necessary User information and
                  includes validation of relationships with Third Party Partners
                  User requests to integrate with.
                </p>
              </div>
              <div className="row">
                <h4>7. TERM, TERMINATION AND VIOLATIONS OF THE AGREEMENT</h4>
                <p className="col-md-12">
                  This Agreement is effective as of the date that you agree to
                  this Agreement ( the “Effective Date”) and shall be in effect
                  for a period of two (2) years unless earlier terminated by
                  either Party in accordance with the foregoing provisions (the
                  “<b>Term</b>”).
                </p>
                <p className="col-md-12">
                  Your rights under this Agreement will terminate automatically
                  without notice if you fail to comply with any term of this
                  Agreement. Further, Company reserves the right, in its sole
                  and absolute discretion, to modify, suspend, or discontinue at
                  any time, with or without notice, the Company Services. We
                  will have no liability whatsoever on account of any change to
                  the Company Services or any suspension or termination of your
                  access to or use of the Company Services. User may terminate
                  this Agreement at any time by providing written notice to
                  Company whereas User’s account with Company will be deleted.
                  Company may also terminate this Agreement at any time by
                  providing written notice to User. The Term will end effective
                  immediately upon either Party’s termination of this Agreement.
                </p>
                <p className="col-md-12">
                  Upon termination of this Agreement for any reason or no
                  reason, any provision of this Agreement that contemplates or
                  governs performance or observance subsequent to termination of
                  this Agreement will survive the termination of this Agreement,
                  including without limitation, the following sections: (i) 4
                  “Disclaimer;” (ii) “Confidential Information;” (iii)
                  “Limitation of Liability;” (iv) “Indemnification;” (v)
                  “Dispute Resolution;” and (vi) “Waiver and Severability.”
                </p>
                <p className="col-md-12">
                  Company reserves the right to seek all remedies available at
                  law and in equity for violations of the Agreement, including,
                  without limitation, the right to block access to the Platform
                  and/or Services from a particular account, device and/or IP
                  address.
                </p>
                <p className="col-md-12">
                  You may not assign or transfer this Agreement or your rights
                  under this Agreement, in whole or in part, by operation of law
                  or otherwise, without our prior written consent. We may assign
                  this Agreement, in whole or in part, at any time to any entity
                  without your notice or consent. Any purported assignment by
                  you in violation of this section shall be null and void.
                </p>
              </div>
              <div className="row">
                <h4>8. REPRESENTATIONS AND WARRANTIES</h4>
                <p className="col-md-12">
                  Each Party hereby represents and warrants that: (i) it has
                  full power and authority to enter into this Agreement and
                  perform its obligations hereunder; (ii) it is duly organized,
                  validly existing and in good standing under the laws of the
                  jurisdiction of its origin; (iii) it has not entered into, and
                  during the Term will not enter into, any agreement that would
                  prevent it from complying with or performing under this
                  Agreement; (iv) it will comply with all applicable laws and
                  regulations in the performance of this Agreement and any
                  activities hereunder (including, but not limited to, all
                  applicable consumer protection, data protection and privacy
                  laws and, in the case of User, all applicable Food Safety
                  Standards). User hereby represents and warrants that: (a) all
                  text, data, images, and information (collectively, the
                  “Information”) submitted by User on the Platform is true,
                  accurate, and complete; and that (b) any use and display of
                  such Information shall not: (i) infringe or violate any
                  patent, copyright, trademark, service mark, trade secret, or
                  other intellectual property rights of a third party or
                  individual, including any right of privacy or publicity; (ii)
                  violate any federal, state or local laws or regulations or
                  foreign laws, including any, false, deceptive or unfair trade
                  practices.
                </p>
              </div>
              <div className="row">
                <h4>9. OUR MATERIALS AND LICENSE TO YOU</h4>
                <p className="col-md-12">
                  With the exception of Content (defined below), the Platform
                  and everything on it, including, without limitation, text,
                  photos, videos, graphics and software, (collectively, the
                  “Materials”) is owned by or licensed to Company. The Platform
                  and the Materials are protected by trade dress, domain name,
                  patent, trade secret, international treaties, and/or other
                  intellectual or proprietary rights and laws of the United
                  States and other countries. Except as otherwise indicated on
                  the Platform and except for the intellectual property of other
                  companies that are displayed on the Platform, all intellectual
                  property, such as trademarks, service marks, logos, trade
                  dress, and trade names are proprietary to Company.
                  Accordingly, You are not authorized to download any content
                  from the Platform, including, without limitation, the
                  Materials, and if you do, Company will not be responsible in
                  any way for any damage to your computer system or loss of data
                  that results from such download. Please also be advised that
                  Company enforces its intellectual property rights to the
                  fullest extent of the law.
                </p>
                <p className="col-md-12">
                  Subject to your compliance with this Agreement, We grant you a
                  limited, non-exclusive, non-transferable, non-sublicensable,
                  and revocable license to access and use the Platform, solely
                  as expressly permitted by this Agreement and subject to all
                  the terms and conditions of this Agreement, and all applicable
                  intellectual property laws. Any other use of the Platform is
                  strictly prohibited. Nothing contained on the Platform and/or
                  Materials should be interpreted as granting to You any license
                  or right to use any of the Materials (other than as provided
                  herein) and/or third-party proprietary content on the Platform
                  without the express written permission of Company or the
                  relevant third-party owner, as applicable. Any rights not
                  expressly granted herein are reserved by Company and Company’s
                  licensors.
                </p>
                <p className="col-md-12">
                  For the avoidance of doubt, you may not: (i) remove any
                  copyright, trademark or other proprietary notices from any
                  portion of the Platform or Company Services; (ii) reproduce,
                  modify, prepare derivative works based upon, distribute,
                  license, lease, sell, resell, transfer, publicly display,
                  publicly perform, transmit, stream, broadcast or otherwise
                  exploit the Platform or Services except as expressly permitted
                  by Company; (iii) decompile, reverse engineer or disassemble
                  the Platform or Services except as may be permitted by
                  applicable law; (iv) link to, mirror or frame any portion of
                  the Platform or Services; (v) cause or launch any programs or
                  scripts for the purpose of scraping, indexing, surveying, or
                  otherwise data mining any portion of the Platform or Services
                  or unduly burdening or hindering the operation and/or
                  functionality of any aspect of the Platform or Services; or
                  (vi) attempt to gain unauthorized access to or impair any
                  aspect of the Platform or Services or its related systems or
                  networks.
                </p>
              </div>
              <div className="row">
                <h4>10. DISCLAIMER</h4>
                <p className="col-md-12">
                  EXCEPT AS SET FORTH HEREIN, EACH PARTY MAKES NO
                  REPRESENTATIONS, AND HEREBY EXPRESSLY DISCLAIMS ALL
                  WARRANTIES, EXPRESS OR IMPLIED, REGARDING ITS SERVICES OR
                  PRODUCTS OR ANY PORTION THEREOF, INCLUDING ANY IMPLIED
                  WARRANTY OF MERCHANTABILITY OR FITNESS FOR A PARTICULAR
                  PURPOSE AND IMPLIED WARRANTIES ARISING FROM COURSE OF DEALING
                  OR COURSE OF PERFORMANCE.
                </p>
                <p className="col-md-12">
                  COMPANY SHALL NOT BE LIABLE FOR DELAY OR FAILURE IN
                  PERFORMANCE RESULTING FROM CAUSES BEYOND COMPANY'S REASONABLE
                  CONTROL, INCLUDING, WITHOUT LIMITATION, DELAYS AND OTHER
                  PROBLEMS INHERENT IN THE USE OF THE INTERNET AND ELECTRONIC
                  COMMUNICATIONS. COMPANY IS NOT RESPONSIBLE FOR ANY DELAYS,
                  INTEGRATION FAILURES, OR OTHER DAMAGE RESULTING FROM SUCH
                  PROBLEMS.
                </p>
              </div>
              <div className="row">
                <h4>11. CONFIDENTIAL INFORMATION</h4>
                <p className="col-md-12 indendeed">
                  <b>11.1 Confidential Information.</b> User acknowledges that
                  its employees and other representatives will be exposed to
                  confidential and proprietary information of Company during the
                  ordinary course of providing the services contemplated by this
                  Agreement. During and after the term of this Agreement, User
                  will hold in strictest confidence, and will not use or
                  disclose to any third party, any Confidential Information (as
                  defined below). User agrees to use its best efforts and to
                  cause its employees and other representatives to the use the
                  same degree of care to maintain the confidentiality of such
                  information. Each Party (the “<b>Recipient</b>”) shall take
                  reasonable steps to protect proprietary and confidential
                  information and materials that, under the circumstances
                  surrounding the disclosure, ought in good faith to be treated
                  as proprietary or confidential provided by the other party or
                  its representatives (the “<b>Discloser</b>”) from improper
                  disclosure and shall only use and disclose such Confidential
                  Information to perform the Services or fulfil its obligations
                  under this Agreement.
                </p>
                <p className="col-md-12 indendeed">
                  <b>11.2 Definition of Confidential Information.</b> “
                  <b>Confidential</b>
                  Information” as used in this Agreement shall mean all
                  information disclosed by Discloser to Recipient that is not
                  generally known in the trade or industry and shall include,
                  without limitation, (i) concepts and ideas relating to the
                  development and distribution of content in any medium or to
                  the current, future and proposed products or services of
                  Discloser or its subsidiaries or affiliates; (ii) trade
                  secrets, drawings, inventions, discoveries, software programs,
                  designs, hardware configuration information, and software
                  source documents; (iii) information regarding plans for
                  research, development, new service offerings or products,
                  marketing and selling, business plans, business forecasts,
                  budgets and unpublished financial statements, licenses and
                  distribution arrangements, rate sheets, prices and costs,
                  suppliers and 6 customers; (iv) existence of any business
                  discussions, negotiations or agreements between the parties;
                  and (v) any information regarding the skills and compensation
                  of employees, contractors or other agents of Company or its
                  subsidiaries or affiliates. Confidential Information shall not
                  include information previously known to Recipient or materials
                  to which Recipient had access prior to the provision of such
                  information or materials by Discloser; information or
                  materials that are now or later become available in the public
                  domain; information or materials provided to Recipient by a
                  third party not bound by a duty of confidentiality to
                  Discloser; or information independently developed by Recipient
                  without breach of this Agreement. Recipient shall inform
                  Discloser of all inquiries into or requests for Discloser’s
                  Confidential Information by third parties and shall disclose
                  Confidential Information to such third parties only when
                  legally compelled to do so and after notice to Discloser, or
                  when so permitted or instructed by Discloser. Notwithstanding
                  anything to the contrary, the Recipient may retain in their
                  possession copies of the Confidential Information in
                  accordance with the policies and procedures of the Recipient
                  in order to comply with law, regulation or archival purposes;
                  provided, however, that any Confidential Information so
                  retained will continue to be Confidential Information pursuant
                  to the terms of this Agreement and the Recipient will continue
                  to be bound by the terms of this Agreement. The obligations of
                  Recipient in Section 8 shall survive the termination of this
                  Agreement.
                </p>
                <p className="col-md-12 indendeed">
                  <b>11.3 Other Company Confidential Information.</b> User
                  agrees that User will not improperly use, disclose, or induce
                  Company Services to use any proprietary information or trade
                  secrets of any former or concurrent employer of Company or
                  other person or entity with which Company has an obligation to
                  keep in confidence.
                </p>
              </div>
              <div className="row">
                <h4>12. LIMITATIONS OF LIABILITY</h4>
                <p className="col-md-12 indendeed">
                  PARTY NOR ITS AFFILIATES, DIRECTORS, OFFICERS, AND EMPLOYEES
                  WILL BE LIABLE FOR ANY INDIRECT, INCIDENTAL, CONSEQUENTIAL,
                  SPECIAL, OR EXEMPLARY DAMAGES (INCLUDING LOSS OF PROFITS OR
                  REVENUE, OR INTERRUPTION OF BUSINESS) ARISING FROM, RELATED
                  TO, OR IN CONNECTION WITH THIS AGREEMENT OR COMPANY TERMS OF
                  USE, THE PLATFORM OR SERVICES, REGARDLESS OF THE THEORY OF
                  LIABILITY, EVEN IF A PARTY HAS BEEN ADVISED OF THE POSSIBILITY
                  OF SUCH DAMAGES. THE LIMITATIONS SET FORTH IN THIS SECTION 11
                  SHALL APPLY REGARDLESS OF WHETHER THE LIABILITY ARISES OUT OF
                  BREACH OF CONTRACT, BREACH OF WARRANTY, TORT (INCLUDING
                  NEGLIGENCE AND STRICT LIABILITY) OR ANY OTHER LEGAL THEORY.
                </p>
              </div>
              <div className="row">
                <h4>13. INDEMNIFICATION</h4>
                <p className="col-md-12">
                  User agrees to defend, indemnify, and hold harmless Company
                  and its affiliates, subsidiaries, parents, successors and
                  assigns, and each of their respective officers, directors,
                  employees, agents, or shareholders harmless from and against
                  all claims, actions, suits, proceedings, losses, costs,
                  liabilities, and expenses (including reasonable attorneys’
                  fees) arising directly or indirectly from or in connection
                  with: (i) User’s breach of its representations, warranties or
                  obligations under this Agreement; (ii) User’s violation of any
                  law or the rights of a third-party as a result of User’s own
                  interaction with such third-party; (iii) any allegation that
                  any materials that User submit to Company or transmit through
                  the Platform infringe or otherwise violate the copyright,
                  trademark, trade secret or other intellectual property or
                  other rights of any third party; or (iv) breach by User or
                  User’s assistants, employees, contractors or agents of this
                  Agreement or the documents it incorporates by reference.
                </p>
              </div>
              <div className="row">
                <h4>14. GOVERNING LAW</h4>
                <p className="col-md-12">
                  You acknowledge and agree that your access to and/or use of
                  the Platform, the Services, the Materials, and other content
                  on the Platform is subject to all applicable international,
                  federal, state, and local laws and regulations. The terms,
                  conditions, and policies contained in this Agreement shall be
                  governed by and construed in accordance with the laws of the
                  State of Delaware, without regard to its conflict of laws
                  principles. Any action, suit, or other legal proceeding which
                  is commenced to resolve any matter arising under or relating
                  to any provision of this Agreement shall be commenced only in
                  a court of the State of Delaware (or, if appropriate, a
                  federal court located within Delaware).
                </p>
              </div>
              <div className="row">
                <h4>15. DISPUTE RESOLUTION AND ARBITRATION AGREEMENT</h4>
                <p className="col-md-12 indendeed">
                  <b>15.1 Arbitration and Class Action Waiver.</b> You agree
                  that all claims, disputes, or disagreements that may arise out
                  of the interpretation or performance of this Agreement or
                  payments by or to Company, or that in any way relate to your
                  use of the Platform, the Materials, the Services, and/or other
                  content on the Platform or any other dispute with Company,
                  shall be submitted exclusively to binding arbitration, except
                  that each party retains the right to bring an individual
                  action in small claims court for disputes and actions within
                  the scope of such court’s jurisdiction and the right to seek
                  injunctive or other equitable relief in a court of competent
                  jurisdiction to prevent the actual or threatened infringement,
                  misappropriation, or violation of a party’s copyrights,
                  trademarks, trade secrets, patents, or other intellectual
                  property rights. Arbitration means that an arbitrator and not
                  a judge or jury will decide the claim. Rights to prehearing
                  exchange of information and appeals may also be limited in
                  arbitration. You acknowledge and agree that you and Company
                  are each waiving the right to a trial by jury. You further
                  acknowledge and agree that you waive your right to participate
                  as a plaintiff or class member in any purported class action
                  or representative proceeding. Further, unless both You and
                  Company otherwise agree in writing, the arbitrator may not
                  consolidate more than one person’s claims, and may not
                  otherwise preside over any form of any class or representative
                  proceeding. If this class action waiver is held unenforceable,
                  then the entirety of this “Dispute Resolution” section will be
                  deemed void. Except as provided in the preceding sentence,
                  this “Dispute Resolution” section will survive any termination
                  of this Agreement. You further acknowledge that any claim
                  arising under this Agreement must be brought within one year
                  of its accrual or it will be waived. The arbitrator, and not
                  any federal, state, or local court or agency, shall have
                  exclusive authority to resolve any dispute relating to the
                  interpretation, applicability, enforceability, or formation of
                  this Agreement to arbitrate, as well as all threshold
                  arbitrability issues, including whether this Dispute
                  Resolution provision is unconscionable and any defense to
                  arbitration.
                </p>
                <p className="col-md-12 indendeed">
                  <b>15.2 Arbitration Rules.</b> The arbitration will be
                  administered by the American Arbitration Association (“AAA”).
                  Except as modified by this “Dispute Resolution” provision, the
                  AAA will administer the arbitration in accordance with either
                  (a) the Commercial Arbitration Rules then in effect, or (b)
                  the Consumer Arbitration Rules then in effect if the matter
                  involves a “consumer” agreement as defined by Consumer
                  Arbitration Rule R-1 (together, the “Applicable AAA
                  Rules”).(The Applicable AAA Rules are available at
                  <a href="https://www.adr.org/Rules">
                    https://www.adr.org/Rules
                  </a>
                  or by calling the AAA at 1-800- 778-7879.) The Federal
                  Arbitration Act will govern the interpretation and enforcement
                  of this entire “Dispute Resolution” provision.
                </p>
                <p className="col-md-12 indendeed">
                  <b>15.3 Arbitration Process.</b> A party who desires to
                  initiate arbitration must provide the other party with a
                  written Demand for Arbitration as specified in the Applicable
                  AAA Rules. The arbitrator will be either a retired judge or an
                  attorney licensed to practice law in the county in which you
                  reside and will be selected in accordance with the Applicable
                  AAA Rules. If the parties are unable to agree upon an
                  arbitrator within fourteen (14) days of the AAA’s notice to
                  the parties of its receipt 8 of the Demand for Arbitration,
                  then the AAA will appoint the arbitrator in accordance with
                  the AAA Rules.
                </p>
                <p className="col-md-12 indendeed">
                  <b>15.4 Arbitrator’s Decision.</b> The arbitrator’s award of
                  damages and/or other relief must be consistent with the terms
                  of the “Limitations of Liability” section above as to the
                  types and the amounts of damages or other relief for which a
                  party may be held liable. Company may seek to recover
                  attorneys’ fees and expenses from the opposing party if
                  Company prevails in arbitration.
                </p>
                <p className="col-md-12 indendeed">
                  <b>15.5 Fees.</b> Your responsibility to pay any AAA filing,
                  administrative and arbitrator fees will be solely as set forth
                  in the Applicable AAA Rules.
                </p>
                <p className="col-md-12 indendeed">
                  <b>15.6 Changes.</b> Company reserves the right to change this
                  “Dispute Resolution” section, but any such changes will not
                  apply to disputes arising before the effective date of such
                  amendment. Notwithstanding the provisions of the
                  modification-related provisions above, if Company changes this
                  “Dispute Resolution” section after the date you first accepted
                  this Agreement (or accepted any subsequent changes to this
                  Agreement), you agree that your continued use of the Company
                  Services after such change will be deemed acceptance of those
                  changes. If you do not agree to such change, you may reject
                  any such change by providing Company written notice of such
                  rejection by email from the email address associated with your
                  account to the Company email provided in the footer of the
                  Platform, within 30 days of the date such change became
                  effective, as indicated in the “Effective” date above. In
                  order to be effective, the notice must include your full name
                  and clearly indicate your intent to reject changes to this
                  “Dispute Resolution” section. By rejecting changes, You are
                  agreeing that You will arbitrate any dispute between you and
                  Company in accordance with the provisions of this “Dispute
                  Resolution” section as of the date you first accepted this
                  Agreement (or accepted any subsequent changes to this
                  Agreement, as applicable).
                </p>
              </div>
              <div className="row">
                <h4>16. WAIVER AND SEVERABILITY</h4>
                <p className="col-md-12">
                  Any waiver by Company of any term of this Agreement must be in
                  writing. If any portion of this Agreement is found to be void,
                  invalid, or otherwise unenforceable, then that portion shall
                  be deemed to be severable and, if possible, superseded by a
                  valid, enforceable provision that matches the intent of the
                  original provision as closely as possible except that in the
                  event of unenforceability of the class action waiver, the
                  entire arbitration agreement shall be unenforceable. The
                  remainder of this Agreement shall continue to be enforceable
                  and valid according to the terms contained herein.
                </p>
              </div>
              <div className="row">
                <h4>17. ENTIRE AGREEMENT</h4>
                <p className="col-md-12">
                  This Agreement, together with any amendments and any
                  additional agreements you may enter into with Company in
                  connection with the Platform and the Services hereunder, shall
                  constitute the entire agreement between you and Company
                  concerning the Platform and the Services hereunder.
                </p>
              </div>
              <div className="row">
                <h4>18. CONTACT</h4>
                <p className="col-md-12">
                  If you have any questions regarding this Agreement, please
                  visit the Platform footer for answers and our contact
                  information.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
