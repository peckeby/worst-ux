import React from "react";

type Props = {
  open: boolean;
  onAccept: () => void;
};

export const RegulationsModal: React.FC<Props> = ({ open, onAccept }) => {
  if (!open) return null;

  return (
    <div className="modal">
      <div className="modal-content regulations-modal">
        <h3>Mandatory Regulations Disclosure</h3>
        <div className="regulations-body">
          <section className="regulations-section">
            <h4>GDPR Excerpts</h4>
              <p>
                  <p>
              In accordance with GDPR Article 6(1)(b), processing is required to
              perform the notarial service requested, and under Article 6(1)(f)
              the Bureau maintains legitimate interests in queue integrity,
              stamp accuracy, and prevention of duplicate filings.
            </p>
            <p>
              Per GDPR Article 5(1)(c), data collection is limited to what is
              necessary for form validation, including ink levels and submission
              timing; data subjects may exercise rights of access, rectification,
              or erasure under Articles 15 through 17.
            </p>
              <p>
                  1. The Right to Erasure (Right to Be Forgotten)
                  Under Article 17 of the GDPR, individuals have the right to have their personal data erased without undue delay where the personal data is no longer necessary in relation to the purposes for which it was collected or otherwise processed. This also applies if the data subject withdraws consent on which the processing is based.
              </p>
                  <p>
                  2. Legal Basis for Processing: Legitimate Interests
                  Processing shall be lawful only if and to the extent that processing is necessary for the purposes of the legitimate interests pursued by the controller or by a third party, except where such interests are overridden by the interests or fundamental rights and freedoms of the data subject which require protection of personal data.
                  </p>
                  <p>
                  3. Data Protection by Design and Default
                  The controller shall, both at the time of the determination of the means for processing and at the time of the processing itself, implement appropriate technical and organizational measures, such as pseudonymization, which are designed to implement data-protection principles, such as data minimization, in an effective manner.
                  </p>
                      <p>
                  4. Notification of a Personal Data Breach
                  In the case of a personal data breach, the controller shall without undue delay and, where feasible, not later than 72 hours after having become aware of it, notify the personal data breach to the supervisory authority competent in accordance with Article 55, unless the personal data breach is unlikely to result in a risk to the rights and freedoms of natural persons.
                  </p>
                  <p>
                  5. Transparency and Modalities
                  The controller shall take appropriate measures to provide any information relating to processing to the data subject in a concise, transparent, intelligible, and easily accessible form, using clear and plain language, in particular for any information addressed specifically to a child.
              </p>
                  <p>
                  6. Records of Processing Activities
                  Each controller and, where applicable, the controller's representative, shall maintain a record of processing activities under its responsibility. That record shall contain the name and contact details of the controller, the purposes of the processing, and a description of the categories of data subjects and categories of personal data.
                </p>
                  <p>
                  7. Conditions for Consent
                  Where processing is based on consent, the controller shall be able to demonstrate that the data subject has consented to processing of his or her personal data. If the data subject's consent is given in the context of a written declaration which also concerns other matters, the request for consent shall be presented in a manner which is clearly distinguishable from the other matters.
                  </p>
                  <p>
                  8. The Right to Data Portability
                  The data subject shall have the right to receive the personal data concerning him or her, which he or she has provided to a controller, in a structured, commonly used, and machine-readable format and have the right to transmit those data to another controller without hindrance from the controller to which the personal data have been provided.
</p>
                  <p>
                  9. Processing of Special Categories of Personal Data
                  Processing of personal data revealing racial or ethnic origin, political opinions, religious or philosophical beliefs, or trade union membership, and the processing of genetic data, biometric data for the purpose of uniquely identifying a natural person, data concerning health or data concerning a natural person's sex life or sexual orientation shall be prohibited unless a specific derogation applies.
                  </p>
                  10. Designation of the Data Protection Officer (DPO)
                  The controller and the processor shall designate a data protection officer in any case where the processing is carried out by a public authority or body, or where the core activities of the controller or the processor consist of processing operations which require regular and systematic monitoring of data subjects on a large scale.
              </p>
          </section>
          <section className="regulations-section">
            {/*<h4>Miscellaneous Addenda</h4>*/}
            <p>
              Recipe note: Combine 1 cup rice, 2 cups water, and a pinch of salt;
              simmer covered for 18 minutes, then fluff with a fork and let it
              rest for 5 more minutes.
            </p>
            <p>
              Recipe note: Toast two slices of bread, add sliced tomatoes and
              olive oil, and finish with cracked pepper and basil.
            </p>
            <p>
              Philosophy clause: A form unexamined is a form not worth
              submitting.
            </p>
            <p>
              Philosophy clause: The queue moves not by haste, but by steady
              attention to detail.
            </p>
          </section>
        </div>
        <button className="primary" onClick={onAccept}>
          Accept Regulations
        </button>
      </div>
    </div>
  );
};

