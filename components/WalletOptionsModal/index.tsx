import Image from "next/image";
import { useContext, useEffect } from "react";
import { useConnect, useAccount,type UseConnectParameters } from "wagmi";
import { Button } from "@material-tailwind/react/components/Button";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { config } from "@components/provider";

interface Props {
  open: boolean;

  setOpen: (showWalletOptions: boolean) => void;
}

export default function WalletOptionsModal(props: Props) {
  const { open, setOpen } = props;

  const connectData =useConnect();
  const accountData= useAccount();

  useEffect(() => {
    accountData && setOpen(false);
  }, [accountData, setOpen]);

  return open ? (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-card">
        <div className="relative w-auto max-w-3xl mx-auto my-6">
          <div className="relative flex flex-col bg-white border-0 rounded-lg shadow-lg">
            <div className="flex items-center justify-around p-5 mb-4">
              <MdOutlineAccountBalanceWallet className="flex m-1 text-4xl" />
              <h3 className="text-3xl font-semibold text-left">
                Choose a Wallet
              </h3>
            </div>

            {connectData.connectors.map((c) => (
              <div key={c.id} className="mb-2 ml-2 mr-2 w-80">
                <Button
                  loading={false}
                  disabled={!c.getChainId}
                  onClick={() => {}}
                >
                  <>
                    <div className="mr-3">
                      <Image
                        src={`/images/${c.id}.svg`}
                        alt={c.name}
                        height={32}
                        width={32}
                      />
                    </div>
                    {`${c.name}${!c.getChainId() ? " (unsupported)" : ""}`}
                  </>
                </Button>
              </div>
            ))}
            {/* {error && (
              <div className="ml-2 text-red-500">
                {error?.message ?? "Failed to connect"}
              </div>
            )} */}

            <div className="flex items-center justify-end p-3 mt-1">
              <button
                className="px-6 py-2 mb-1 text-sm font-semibold text-red-500 uppercase"
                type="button"
                onClick={() => setOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
    </>
  ) : null;
}
