import PropTypes from 'prop-types';

const Loading = ({ fullScreen = false, size = 'md', text = '' }) => {
    const sizeClasses = {
        sm: 'w-8 h-8',
        md: 'w-16 h-16',
        lg: 'w-24 h-24'
    };

    const containerClasses = fullScreen
        ? "flex items-center justify-center min-h-screen"
        : "flex items-center justify-center";

    return (
        <div className={containerClasses}>
            <div className="flex flex-col items-center">
                <div className={`${sizeClasses[size]} border-4 border-gray-300 border-t-amber-500 rounded-full animate-spin`}></div>
                {text && <p className="mt-4 text-gray-300">{text}</p>}
            </div>
        </div>
    );
};

Loading.propTypes = {
    fullScreen: PropTypes.bool,
    size: PropTypes.oneOf(['sm', 'md', 'lg']),
    text: PropTypes.string,
};

export default Loading;