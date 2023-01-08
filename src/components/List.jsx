import { useNavigate } from "@solidjs/router";
import { createSignal, For, Show } from "solid-js";

import Button from "../Atoms/Button";
import ConfirmationModal from "../Atoms/ConfirmationModal";
import EyeIcon from "../Atoms/Icons/Eye";
import PencilIcon from "../Atoms/Icons/Pencil";
import TrashIcon from "../Atoms/Icons/Trash";

import { packages, setPackages } from "../store/package";
import { getIndexOfPackage } from "../services/package";

const List = () => {
  const navigate = useNavigate();

  const [deletedId, setDeletedId] = createSignal(null);

  const deleteAction = () => {
    const packageList = packages();
    const index = getIndexOfPackage(packageList, deletedId());
    if (index > -1) {
      packageList.splice(index, 1);
      setPackages([...packageList]);
    }
    closeModal();
  };

  const closeModal = () => {
    setDeletedId(null);
  };

  return (
    <div class="h-full">
      <ConfirmationModal
        open={deletedId}
        text="Are you sure you want to delete?"
        okText="Yes"
        noText="Cancel"
        okAction={deleteAction}
        noAction={closeModal}
        onClose={closeModal}
      />

      <div class="flex items-center	justify-between">
        <div class="font-bold	text-xl">Welcome to Favorite NPM Packages: </div>
        <Show when={packages().length > 0}>
          <Button children="Add Fav" onClick={() => navigate("/add")} />
        </Show>
      </div>

      <div class="mt-28">
        <Show when={packages().length > 0}>
          <div class="relative overflow-x-auto">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="px-6 py-3">
                    Package name
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                <For each={packages()}>
                  {(packageItem) => (
                    <tr class="bg-white text-black">
                      <th scope="row" class="border px-6 py-4">
                        {packageItem.name}
                      </th>
                      <td class="px-6 py-4 border">
                        <div class="flex gap-2">
                          <EyeIcon
                            onClick={() => navigate(`/view/${packageItem.id}`)}
                          />
                          <PencilIcon
                            onClick={() => navigate(`/edit/${packageItem.id}`)}
                          />
                          <TrashIcon
                            onClick={() => setDeletedId(packageItem.id)}
                          />
                        </div>
                      </td>
                    </tr>
                  )}
                </For>
              </tbody>
            </table>
          </div>
        </Show>

        <Show when={packages().length === 0}>
          <div class="p-40 border text-center">
            <div class="mb-10">You don't have any fav yet. Please add</div>

            <Button children="Add Fav" onClick={() => navigate("/add")} />
          </div>
        </Show>
      </div>
    </div>
  );
};

export default List;
