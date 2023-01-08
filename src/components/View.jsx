import { useParams, useNavigate } from "@solidjs/router";
import { createEffect, createSignal } from "solid-js";

import Back from "../Atoms/Icons/Back";

import { packages, setPackages } from "../store/package";
import { findPackageFromList } from "../services/package";

const View = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [selectedPackage, setSelectedPackage] = createSignal({});

  createEffect(() => {
    let packagesList = packages();

    const item = findPackageFromList(packagesList, params.id);

    if (!item) {
      return navigate("/");
    }

    setSelectedPackage(item);
  });

  return (
    <div class="w-1/2 m-auto">
      <div>
        <Back onClick={() => navigate("/")} />
      </div>
      <div class="text-center pt-10">
        <div>
          <b>Selected Package Name:</b> {selectedPackage()?.name}
        </div>
        <div>
          <b>Description:</b> {selectedPackage()?.description}
        </div>
      </div>
    </div>
  );
};

export default View;
