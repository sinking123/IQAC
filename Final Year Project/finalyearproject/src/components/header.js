import React, { Component } from "react";

export default function Header() {
  return (
    <div>
      <h1 className="Header">Welcome, </h1>
      <p>
        {" "}
        "In todays world Medical Industry seems to be of vital importance.
        Advances in Technologies seems to provide possibilities in improving the
        medical care that todays world receives. Due to increase in complexity
        and quantity of medical data a proper method for handling the data for
        undergoing complex tasks such as Question and Answering Sentence
        Similarity Document Classification Relation Extraction Hence, We
        introduce the adaptation of SemBert to BioMedical Domain for catering
        the requirements of data storage as well as handling other tasks in the
        field of BioMedicine."
      </p>
      <p>
        We propose a solution to adapt to biomedical domain which could be a
        basis architecture for handling biomedical data and apply it in various
        tasks. According to the theoretical results we predict that it could
        outperform the current leading architectures due to the semantics
        dependent transformers.
      </p>
    </div>
  );
}
