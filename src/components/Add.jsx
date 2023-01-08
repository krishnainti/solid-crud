import {
  createEffect,
  createSignal,
  Show,
  createResource,
  createMemo,
} from "solid-js";
import { useNavigate, useParams } from "@solidjs/router";

import TextInput from "../Atoms/TextInput";
import TextArea from "../Atoms/TextArea";
import RadioGroup from "../Atoms/RadioGroup";
import Loader from "../Atoms/Icons/Loader";
import Button from "../Atoms/Button";

import { setPackages, packages } from "../store/package";
import { getIndexOfPackage, findPackageFromList } from "../services/package";

async function fetchPackages(q) {
  const response = await fetch(
    `https://api.npms.io/v2/search?q=${q || "reactjs"}`
  );

  return (await response.json()).results.map((i) => ({
    ...i,
    label: i.package.name,
    value: i.package.name,
  }));
}

const Add = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [search, setSearch] = createSignal("");
  const [packageList, setPackageList] = createSignal([]);
  const [form, setForm] = createSignal({
    name: "",
    description: "",
  });
  const [errors, setErrors] = createSignal({});

  const [packageResource] = createResource(search, fetchPackages, {
    initialValue: packageList(),
    storage: (init) => {
      return [packageList, setPackageList];
    },
  });

  const selectedName = createMemo(() => {
    return form().name;
  });

  const description = createMemo(() => {
    return form().description;
  });

  const nameError = createMemo(() => {
    return errors().name;
  });

  const descriptionError = createMemo(() => {
    return errors().description;
  });

  const saveFavPackage = () => {
    const formData = form();
    formData.id = params.id || Date.now();

    const errorsList = {};

    if (!formData.name) {
      errorsList.name = "Please Select Package";
    }

    if (!formData.description) {
      errorsList.description = "Please enter description";
    }

    setErrors(errorsList);

    if (Object.keys(errorsList)?.length) return;

    const packagesList = packages();

    const index = getIndexOfPackage(packagesList, formData.id);

    if (index > -1) {
      packagesList[index] = formData;
    } else {
      packagesList.push(formData);
    }

    setPackages(packagesList);

    navigate("/");
  };

  createEffect(() => {
    let packagesList = packages();

    const item = findPackageFromList(packagesList, params.id);

    if (item) {
      setSearch(item.name);
      setForm(item);
    }
  });

  return (
    <div class="h-full w-1/2 m-auto">
      <TextInput
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search for NPM package"
        label="Search for NPM package"
      />

      <div class="pt-4">
        <Show
          when={!packageResource.loading}
          fallback={
            <div>
              <Loader />
            </div>
          }
        >
          <RadioGroup
            options={packageList}
            onChange={(e) => setForm({ ...form(), name: e.target.value })}
            label="Results"
            value={selectedName}
            error={nameError}
          />
        </Show>
      </div>

      <div class="pt-4">
        <TextArea
          value={description}
          onChange={(e) => setForm({ ...form(), description: e.target.value })}
          placeholder="Why is this your fav?"
          label="Why is this your fav?"
          error={descriptionError}
        />
      </div>

      <div class="pt-4 flex justify-end">
        <Button
          children={params?.id ? "Update" : "Save"}
          onClick={saveFavPackage}
        />
      </div>
    </div>
  );
};

export default Add;
