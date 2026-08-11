import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import useAuthStore from "../stores/authStore";
import { useAuth } from "../hooks/useAuth";
import { User as UserIcon, Mail, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";

const Settings = () => {
    const { t } = useTranslation();
    const user = useAuthStore((state) => state.user);
    const setUser = useAuthStore((state) => state.setUser);
    const { updateUser } = useAuth();

    const [name, setName] = useState(user?.name || "");
    const [email, setEmail] = useState(user?.email || "");
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        if (user) {
            setName(user.name || "");
            setEmail(user.email || "");
        }
    }, [user]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user?.id) return;
        setIsSaved(false);

        const updatedData = {
            id: user.id,
            name: name.trim(),
            email: email.trim(),
        };

        updateUser.mutate(updatedData, {
            onSuccess: (res) => {
                setUser({
                    ...user,
                    name: updatedData.name,
                    email: updatedData.email,
                    ...(res?.user || {}),
                });
                setIsSaved(true);
                setTimeout(() => setIsSaved(false), 4000);
            },
            onError: (err) => {
                console.error("Failed to update profile", err);
            }
        });
    };

    return (
        <div className="flex flex-col gap-6 p-6 max-w-4xl mx-auto w-full text-ui-primaryText">
            {/* Header */}
            <div className="flex flex-col gap-1 border-b border-ui-outline/40 pb-4">
                <h1 className="text-2xl font-bold flex items-center gap-2">
                    <span>⚙️</span> {t("Account Settings")}
                </h1>
                <p className="text-ui-secondaryText text-sm">
                    {t("Update your profile details below.")}
                </p>
            </div>

            {/* Success Alert */}
            {isSaved && (
                <div className="flex items-center gap-3 p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 rounded-xl transition-all animate-in fade-in slide-in-from-top-2">
                    <CheckCircle2 size={20} className="shrink-0" />
                    <span className="font-medium text-sm">
                        {t("Profile updated successfully!")}
                    </span>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Main Profile Form */}
                <div className="md:col-span-2 bg-ui-surfaceContainer border border-ui-outline/60 rounded-2xl p-6 shadow-sm">
                    <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-ui-primaryText">
                        <UserIcon size={18} className="text-ui-primary" />
                        {t("Personal Information")}
                    </h2>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-ui-secondaryText mb-1.5">
                                {t("Full Name")}
                            </label>
                            <div className="relative">
                                <UserIcon
                                    size={18}
                                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ui-secondaryText/60"
                                />
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder={t("Full Name")}
                                    required
                                    className="w-full bg-ui-surface text-ui-primaryText border border-ui-outline pl-10 pr-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-ui-primary transition-all text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-ui-secondaryText mb-1.5">
                                {t("Email Address")}
                            </label>
                            <div className="relative">
                                <Mail
                                    size={18}
                                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ui-secondaryText/60"
                                />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder={t("Email Address")}
                                    required
                                    className="w-full bg-ui-surface text-ui-primaryText border border-ui-outline pl-10 pr-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-ui-primary transition-all text-sm"
                                />
                            </div>
                        </div>

                        <div className="flex justify-end pt-2">
                            <button
                                type="submit"
                                disabled={updateUser.isPending}
                                className="bg-ui-primary text-ui-insidePrimaryText font-semibold py-2.5 px-6 rounded-xl hover:opacity-90 transition-all cursor-pointer shadow-sm active:scale-95 disabled:opacity-50 text-sm"
                            >
                                {updateUser.isPending ? t("Saving...") : t("Save Changes")}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Account Details Side Card */}
                <div className="flex flex-col gap-4">
                    <div className="bg-ui-surfaceContainer border border-ui-outline/60 rounded-2xl p-6 shadow-sm flex flex-col gap-4">
                        <h2 className="text-base font-bold flex items-center gap-2 text-ui-primaryText">
                            <ShieldCheck size={18} className="text-ui-primary" />
                            {t("Account Preferences")}
                        </h2>

                        <div className="flex flex-col gap-3 text-xs text-ui-secondaryText border-t border-ui-outline/30 pt-3">
                            <div className="flex justify-between items-center py-1">
                                <span>{t("Active Status")}</span>
                                <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 font-semibold border border-emerald-500/20">
                                    {t("Active")}
                                </span>
                            </div>
                            {user?.id && (
                                <div className="flex justify-between items-center py-1">
                                    <span>User ID</span>
                                    <span className="font-mono text-ui-primaryText font-semibold">
                                        #{user.id}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="bg-linear-to-br from-ui-primary/10 via-ui-surfaceContainer to-ui-surfaceContainer border border-ui-primary/20 rounded-2xl p-5 shadow-sm flex flex-col gap-2">
                        <div className="flex items-center gap-2 text-ui-primary font-bold text-sm">
                            <Sparkles size={16} />
                            <span>Tahqeeq Pro</span>
                        </div>
                        <p className="text-xs text-ui-secondaryText leading-relaxed">
                            {t("Achieve Your Development Goals with Agility")}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
