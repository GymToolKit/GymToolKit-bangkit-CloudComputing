const mapDBToModelTools = ({
  id,
  tools_name,
  video_url,
  headline,
  tools_step,
}) => ({
  id,
  toolsName: tools_name,
  videoUrl: video_url,
  headline,
  toolsStep: tools_step,
});

module.exports = { mapDBToModelTools };
